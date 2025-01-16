<template>
  <EntryWrapper>
    <EntryList>
      <NewEntry title="New Note" @click="add" />
      <template v-for="item, index in isToday ? entryStore.todayNotes : entryStore.allNotes">
        <Entry :value="item" :index="index" @update="update" @remove="remove" />
      </template>
    </EntryList>
    <EntryPopup v-model:model-visible="visible" v-model:color-value="itemTMP.color" title="New Agenda">
      <NoteForm v-model="itemTMP" :update="!!item" @submit="onSubmit" />
    </EntryPopup>
    <label class="swap btn btn-neutral absolute bottom-4 right-4">
      <input type="checkbox" v-model="isToday" />
      <div class="swap-on">Today</div>
      <div class="swap-off">All</div>
    </label>
  </EntryWrapper>
</template>
<script lang="ts">
import Entry from '@/components/entries/Entry.vue';
import EntryList from '@/components/entries/EntryList.vue';
import EntryPopup from '@/components/entries/EntryPopup.vue';
import EntryWrapper from '@/components/entries/EntryWrapper.vue';
import NewEntry from '@/components/entries/NewEntry.vue';
import NoteForm from '@/components/entries/NoteForm.vue';
import { deleteEntry, writeEntry } from '@/services/app/entryService';
import { useEntryStore } from '@/stores/entry';
import type { UNote } from '@/types/note';

export default {
  components: {
    EntryWrapper,
    EntryList,
    NewEntry,
    Entry,
    EntryPopup,
    NoteForm
  },
  data() {
    return {
      isToday: true,
      visible: false,
      entryStore: useEntryStore(),
      item: this.getItem() as UNote | null,
      itemTMP: this.getItem(),
    }
  },
  methods: {
    add() {
      this.item = null
      this.itemTMP = this.getItem()
      this.visible = true;
    },
    update(item: UNote, index: number) {
      this.item = item
      this.itemTMP = { ...item }
      this.visible = true;
    },
    remove(item: UNote, index: number) {
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
      } as UNote
    },
    async deleteOldEntryIfExsist() {
      if (this.item) await deleteEntry('note', this.item).catch(() => "")
    },
    saveNewEntry() {
      writeEntry('note', this.itemTMP)
    },
    removeFromListIfExsist() {
      if (this.item) {
        const day = new Date(this.item.timestamp).toDateString()
        const itemList = this.entryStore.notes[day];
        if (itemList) {
          const filter = (i: UNote) => i.timestamp != this.item?.timestamp
          this.entryStore.notes[day] = itemList.filter(filter);
        }
      }
    },
    addToList() {
      this.entryStore.addNote(this.itemTMP)
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