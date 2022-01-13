<template>
    <b-container style="padding: 2%;">
        <b-card title="Contactos" class="mb-2">
            <b-container class="bv-example-row" fluid="md">
                <b-row align-h="end" class="mb-2">
                    <b-col cols="12" md="4" lg="2" xl="2">
                        <b-button block href="#" variant="primary" v-b-modal.modal-prevent-closing style="padding-bottom: 5px;">Nuevo Contacto</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card-text>
                            <b-container>
                                <b-row align-v="center">
                                    <b-col align-self="center">
                                        <b-table striped hover :items="items" :fields="fields">
                                            <template v-slot:cell(actions)="row">
                                                <div style="font-size: 1rem;width: 150px">
                                                    <b-button variant="outline-warning" @click="handleEdit(row)" class="mb-1">
                                                        <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                                                    </b-button>
                                                    <b-button variant="outline-danger" @click="handleDelete(row)" class="mb-1">
                                                        <b-icon icon="trash2-fill" aria-hidden="true"></b-icon>
                                                    </b-button>
                                                </div>
                                            </template>
                                        </b-table>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-text>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <!-- Modal Edit -->
        <b-modal :id="infoModal.id" :title="infoModal.title" @hidden="resetModal" @ok="handleOk">
            <form id="modal-edit" ref="formEdit" @submit.stop.prevent="handleSubmit">
                <b-container>
                    <b-row>
                        <input type="hidden" ref="type_form" value="true">
                        <b-col cols="12" md="6">
                            <b-form-group :state="editnameState" label="Nombre" label-for="editname" invalid-feedback="El nombre es requerido" >
                                <b-form-input class="sr-only" id="editid" v-model="editid" required ></b-form-input>
                                <b-form-input id="editname" v-model="editname" :state="editnameState" required ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group :state="editmobilePhoneState" label="Móvil" label-for="editmobile_phone" invalid-feedback="El móvil es requerido" >
                                <b-form-input id="editmobile_phone" v-model="editmobile_phone" :state="editmobilePhoneState" required ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group :state="edithomePhoneState" label="Teléfono de casa" label-for="edithome_phone">
                                <b-form-input id="edithome_phone" v-model="edithome_phone" :state="edithomePhoneState"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group :state="editworkPhoneState" label="Teléfono de trabajo" label-for="editwork_phone">
                                <b-form-input id="editwork_phone" v-model="editwork_phone" :state="editworkPhoneState"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="12">
                            <b-form-group :state="editemailState" label="Correo electrónico" label-for="editemail">
                                <b-form-input  id="editemail" v-model="editemail" type="email" :state="editemailState" required></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>
            </form>
        </b-modal>
        <!-- Modal Ver -->
        <b-modal id="modal-prevent-closing" ref="modal" title="Nuevo contacto" size="lg" @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-container>
                    <b-row>
                        <input type="hidden" ref="type_form" value="false">
                        <b-col cols="12" md="6">
                            <b-form-group :state="nameState" label="Nombre" label-for="name" invalid-feedback="El nombre es requerido" >
                                <b-form-input id="name" v-model="name" :state="nameState" required ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group :state="mobilePhoneState" label="Móvil" label-for="mobile_phone" invalid-feedback="El movil es requerido" >
                                <b-form-input id="mobile_phone" v-model="mobile_phone" :state="mobilePhoneState" required ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group :state="homePhoneState" label="Teléfono de casa" label-for="home_phone">
                                <b-form-input id="home_phone" v-model="home_phone" :state="homePhoneState"></b-form-input>
                            </b-form-group>
                        </b-col>
                         <b-col cols="12" md="6">
                            <b-form-group :state="workPhoneState" label="Teléfono de trabajo" label-for="work_phone">
                                <b-form-input id="work_phone" v-model="work_phone" :state="workPhoneState"></b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" md="12">
                            <b-form-group :state="emailState" label="Correo electrónico" label-for="email">
                                <b-form-input  id="email" v-model="email" type="email" :state="emailState" required></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>
            </form>
        </b-modal>
    </b-container>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      nameState: null,
      mobile_phone: '',
      mobilePhoneState: null,
      home_phone: '',
      homePhoneState: null,
      work_phone: null,
      workPhoneState: null,
      email: null,
      emailState: null,
      editid: '',
      editname: '',
      editnameState: null,
      editmobile_phone: '',
      editmobilePhoneState: null,
      edithome_phone: '',
      edithomePhoneState: null,
      editwork_phone: null,
      editworkPhoneState: null,
      editemail: null,
      editemailState: null,
      fields: [
        { key: 'name', label: 'Nombre' },
        { key: 'mobile_phone', label: 'Móvil' },
        { key: 'home_phone', label: 'Teléfono de casa' },
        { key: 'work_phone', label: 'Teléfono de trabajo' },
        { key: 'email', label: 'Correo electrónico' },
        { key: 'actions', label: 'Acciones' }
      ],
      items: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('http://127.0.0.1:8000/api/contacts').then(response => {
        this.items = response.data
      })
    },
    checkFormValidity () {
      if (this.$refs.type_form.value === 'true') {
        const valid = this.$refs.formEdit.checkValidity()
        this.editnameState = (this.editname !== '')
        this.editmobilePhoneState = (this.editmobile_phone !== '')
        this.edithomePhoneState = (this.edithome_phone !== '')
        this.editworkPhoneState = (this.editwork_phone !== '')
        this.editemailState = (this.editemail !== '')
        return valid
      } else {
        const valid = this.$refs.form.checkValidity()
        this.nameState = (this.name !== '')
        this.mobilePhoneState = (this.mobile_phone !== '')
        this.homePhoneState = (this.home_phone !== '')
        this.workPhoneState = (this.work_phone !== '')
        this.emailState = (this.email !== '')
        return valid
      }
    },
    resetModal () {
      this.name = ''
      this.nameState = null
      this.mobile_phone = ''
      this.mobilePhoneState = null
      this.home_phone = ''
      this.homePhoneState = null
      this.work_phone = ''
      this.workPhoneState = null
      this.email = ''
      this.emailState = null

      this.editid = ''
      this.editname = ''
      this.editnameState = null
      this.editmobile_phone = ''
      this.editmobilePhoneState = null
      this.editahome_phone = ''
      this.edithomePhoneState = null
      this.editawork_phone = ''
      this.editworkPhoneState = null
      this.editemail = ''
      this.editemailState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      if (this.$refs.type_form.value === 'true') {
        let editItem = {
          id: this.editid,
          name: this.editname,
          mobile_phone: this.editmobile_phone,
          home_phone: this.edithome_phone,
          work_phone: this.editwork_phone,
          email: this.editemail
        }

        this.axios
          .put('http://127.0.0.1:8000/api/contact/edit/' + this.editid, editItem)
          .then(response => {
            this.$set(this.items, this.infoModal.content.index, response.data.contact)
          })

        // Hide the modal manually
        this.$nextTick(() => {
          this.$root.$emit('bv::hide::modal', this.infoModal.id)
        })
      } else {
        let newItem = {
          name: this.name,
          mobile_phone: this.mobile_phone,
          home_phone: this.home_phone,
          work_phone: this.work_phone,
          email: this.email
        }
        this.axios
          .post('http://127.0.0.1:8000/api/contact/store', newItem)
          .then(response => {
            this.items.splice(0, 0, response.data.contact)
          })

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    },
    handleEdit (row) {
      this.infoModal.title = `Contacto: ${row.item.name} ${row.item.mobile_phone}`
      this.infoModal.content = row
      this.editid = row.item.id
      this.editname = row.item.name
      this.editmobile_phone = row.item.mobile_phone
      this.edithome_phone = row.item.home_phone
      this.editwork_phone = row.item.work_phone
      this.editemail = row.item.email
      this.$root.$emit('bv::show::modal', this.infoModal.id)
    },
    handleDelete (row) {
      this.$bvModal.msgBoxConfirm('Desea eliminar este contacto?').then(value => {
        if (value === true) {
          this.axios.delete('http://127.0.0.1:8000/api/contact/delete/' + row.item.id)
            .then(response => {
              this.items.splice(row.index, 1)
            })
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
