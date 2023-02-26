import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data() {
        return{
            form: {
                title: '',
                desc: ''
            },
            notes: [
                {id: 1, title: 'Note', desc: 'first note', marked: false}
            ]
        }
    },
    methods: {
        createNote() {
            const {...note} = this.form

            this.notes.push({...note, id: Date.now()})

            this.form.title = this.form.desc = ''
        },
        markNote(id) {
            const note = this.notes.find(n => n.id === id)
            note.marked = true
        },
        removeNote(id) {

        }
    }
})