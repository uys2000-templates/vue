<template>
  <EntryWrapper>
    <EntryList>
      <NewEntry title="New Agenda" @click="add" />
      <template v-for="item, index in entryStore.todayAgendas">
        <Entry :value="item" :index="index" @update="update" @remove="remove" />
      </template>
    </EntryList>
    <EntryPopup v-model:model-visible="visible" v-model:color-value="itemTMP.color" title="New Agenda">
      <AgendaForm v-model="itemTMP" :update="!!item" @submit="onSubmit" />
    </EntryPopup>
  </EntryWrapper>
</template>
<script lang="ts">
import AgendaForm from '@/components/entries/AgendaForm.vue';
import Entry from '@/components/entries/Entry.vue';
import EntryList from '@/components/entries/EntryList.vue';
import EntryPopup from '@/components/entries/EntryPopup.vue';
import EntryWrapper from '@/components/entries/EntryWrapper.vue';
import NewEntry from '@/components/entries/NewEntry.vue';
import { deleteEntry, writeEntry } from '@/services/app/entryService';
import { useEntryStore } from '@/stores/entry';
import type { UAgenda } from '@/types/agenda';

export default {
  components: {
    EntryWrapper,
    EntryList,
    NewEntry,
    Entry,
    EntryPopup,
    AgendaForm
  },
  data() {
    return {
      visible: false,
      entryStore: useEntryStore(),
      item: this.getItem() as UAgenda | null,
      itemTMP: this.getItem(),
    }
  },
  methods: {
    add() {
      this.item = null
      this.itemTMP = this.getItem()
      this.visible = true;
    },
    update(item: UAgenda, index: number) {
      this.item = item
      this.itemTMP = { ...item }
      this.visible = true;
    },
    remove(item: UAgenda, index: number) {
      this.item = item
      this.deleteOldEntryIfExsist()
      this.removeFromListIfExsist()
    },
    getItem() {
      return {
        timestamp: Date.now(),
        color: "#c56cf0",
        title: "",
        content: "",
        note: "",
        allDay: false,
        start: new Date(),
        end: new Date(Date.now() + 1000 * 60 * 60),
        repeat: false,
        repeatCount: 10,
        repeatType: "weekly",
        repeatWeeklyDays: []
      } as UAgenda
    },
    async deleteOldEntryIfExsist() {
      if (this.item) await deleteEntry('agenda', this.item).catch(() => "")
    },
    saveNewEntry() {
      writeEntry('agenda', this.itemTMP)
    },
    removeFromListIfExsist() {
      if (this.item) {
        const day = this.item.start.toDateString()
        const itemList = this.entryStore.agendas[day];
        if (itemList) {
          const filter = (i: UAgenda) => i.timestamp != this.item?.timestamp
          this.entryStore.agendas[day] = itemList.filter(filter);
        }
      }
    },
    addToList() {
      this.entryStore.addAgenda(this.itemTMP)
    },
    async onSubmit() {
      await this.deleteOldEntryIfExsist()
      this.saveNewEntry();
      this.removeFromListIfExsist()
      this.addToList()
      this.visible = false;
    },
  },
}
</script>