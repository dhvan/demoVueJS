<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="Name">Name</b-form-checkbox>
            <b-form-checkbox value="Chucvu">Chucvu</b-form-checkbox>
            <b-form-checkbox value="Dept">Dept</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(Teams)="row">
        {{row.value.map(teamInfo => teamInfo.name).toString()}}
      </template>
      <template #cell(Name)="row">
        {{row.value}}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Cancel' : 'Edit' }}
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>          
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Full Name:"
              label-for="input-1"
              description="Input employee name"
            >
              <b-form-input
                id="input-1"
                v-model="row.item.Name"
                type="Name"
                placeholder="Input employee name"
                required
                size="sm"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Chucvu" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="row.item.Chucvu"
                placeholder="Enter Role"
                required
                size="sm"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Dept" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="row.item.Dept"
                placeholder="Enter your department"
                required
                size="sm"
              ></b-form-input>
              </b-form-group>
              <div>
                <label class="typo__label">Simple select / dropdown</label>
                <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
                  <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                </multiselect>
              </div>
            <b-button type="submit" variant="primary" @click="onSubmit(row.item)">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
      </template>
    </b-table>

    <b-row>
            <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>  
  </b-container>
</template>

<script>
import EmployeesService from '@/services/EmployeesService'
import Vue from "vue";
import Multiselect from 'vue-multiselect'

  // register globally
Vue.component('multiselect', Multiselect)

  export default {
    data() {
      return {
        fields: [
          { key: 'Name', label: 'Person full name', sortable: true,},
          { key: 'Chucvu', label: 'Role',class: 'text-center' },
          { key: 'Teams', label: 'Teams', class: 'text-center' },
          { key: 'Manager', label: 'Manager', class: 'text-center' },
          { key: 'Dept', label: 'Dept', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' },
        ],
        selected: null,
        options: [
          { name: 'Vue.js', language: 'JavaScript' },
          { name: 'Adonis', language: 'JavaScript' },
          { name: 'Rails', language: 'Ruby' },
          { name: 'Sinatra', language: 'Ruby' },
          { name: 'Laravel', language: 'PHP' },
          { name: 'Phoenix', language: 'Elixir' }
        ],
        show: true,
        form: {
          Name: '',
          Chucvu: '',
          Team: '',
        },
        items: {
          items: null
        },
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "See alls" }],
        sortBy: '',
        sortDesc: false,
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    async mounted () {
      this.items = (await EmployeesService.index()).data,
      this.totalRows = this.items.length
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      async onSubmit(item) {
        await EmployeesService.put({
          employeeId: item.id,
          Name: this.form.Name,
          Chucvu: this.form.Chucvu,
          Team: this.form.Team
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.Name = ''
        this.form.Chucvu = ''
        this.form.Team = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
