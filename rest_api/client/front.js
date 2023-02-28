import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
        <div style="display: flex; justify-content: center; align-items: center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `
})

new Vue({
    el: '#app',
    data() {
        return{
            loading: false,
            form: {
                title: '',
                desc: '',
            },
            notes: []
        }
    },
    computed: {
        canCreate() {
            return this.form.title.trim() && this.form.desc.trim()
        },
    },
    methods: {
        async createNote() {
            const {...note} = this.form

            const newNote = await request('/api/notes', 'POST', note)

            this.notes.push(newNote)

            this.form.title = this.form.desc = ''
        },
        async markNote(id) {
            const note = this.notes.find(n => n.id === id)

            const updated = await request(`/api/notes/${id}`, 'PUT', {
                ...note,
                marked: true,
                dismarked: false
            })

            note.marked = updated.marked
            note.dismarked = updated.dismarked
        },
        async disMarkNote(id) {
            const note = this.notes.find(n => n.id === id)

            const updated = await request(`/api/notes/${id}`, 'PUT', {
                ...note,
                dismarked: true,
                marked: false
            })

            note.marked = updated.marked
            note.dismarked = updated.dismarked
        },
        async removeNote(id) {
            await request(`api/notes/${id}`, 'DELETE')
            this.notes = this.notes.filter(n => n.id !== id)

        },
        async updateNote(id) {
            const {...note1} = this.form

            const note = this.notes.find(n => n.id === id)
            note1.title = this.note.title
            note1.desc = this.note.desc

            const updated = await request(`/api/notes/${id}`, 'PUT', {
                ...note,
            })

            note.desc = note1.desc
        },
    },
    async mounted() {
        this.loading = true
        this.notes = await request('/api/notes')
        this.loading = false
    }
})

async function request(url, method='GET', data=null) {
    try{
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch(e) {
        console.warn('Error', e.message)
    }
}