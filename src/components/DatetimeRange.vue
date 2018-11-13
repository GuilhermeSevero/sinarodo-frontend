<template>
    <div class="row">
        <q-datetime
            ref="dateTimeFrom"
            class="c-lins-date-time-from col-6"
            v-model="dataValueFrom"
            :type="type"
            :clearable="clearable"
            :readonly="readonly"
            :minimal="minimal"
            :min="min"
            :max="dataValueTo"
            :default-value="defaultFrom"
            :display-value="displayFrom"
            :hide-underline="hideUnderline"
            :popover="popover"
            :modal="modal"
            :format="formatoDeExibicao"
            :format24h="format24h"
            :placeholder="placeholderFrom"
            :float-label="floatLabelFrom"
            :stack-label="stackLabelFrom"
            :color="color"
            :inverted="inverted"
            :inverted-light="invertedLight"
            :dark="dark"
            :align="alignFrom"
            :disable="disable"
            :warning="warning"
            :error="error"
            @change="$_changeFrom"
            @blur="$_blurFrom"
            @focus="$_focusFrom"
        />
        <q-datetime
            ref="dateTimeTo"
            class="c-lins-date-time-to col-6"
            v-model="dataValueTo"
            :type="type"
            :clearable="clearable"
            :readonly="readonly"
            :minimal="minimal"
            :min="dataValueFrom"
            :max="max"
            :default-value="defaultTo"
            :display-value="displayTo"
            :popover="popover"
            :modal="modal"
            :format="formatoDeExibicao"
            :format24h="format24h"
            :placeholder="placeholderTo"
            :float-label="floatLabelTo"
            :stack-label="stackLabelTo"
            :color="color"
            :inverted="inverted"
            :inverted-light="invertedLight"
            :dark="dark"
            :align="alignTo"
            :disable="disable"
            :warning="warning"
            :error="error"
            @change="$_changeTo"
            @blur="$_blurTo"
            @focus="$_focusTo"
        />
    </div>
</template>

<script>
export default {
    name: 'DatetimeRange',

    props: {
        value: {
            type: Object,
            default: () => ({
                from: '',
                to: ''
            })
        },

        type: {
            type: String,
            default: 'date',
            validator: function (value) {
                return value === 'date' || value === 'time ' || value === 'datetime'
            }
        },

        clearable: {
            type: Boolean,
            default: true
        },

        readonly: {
            type: Boolean,
            default: false
        },

        minimal: {
            type: Boolean,
            default: false
        },

        min: {
            type: String,
            default: ''
        },

        max: {
            type: String,
            default: ''
        },

        defaultFrom: {
            type: String | Number | Date,
            default: ''
        },

        defaultTo: {
            type: String | Number | Date,
            default: ''
        },

        displayFrom: {
            type: String,
            default: ''
        },

        displayTo: {
            type: String,
            default: ''
        },

        hideUnderline: {
            type: Boolean,
            default: false
        },

        popover: {
            type: Boolean,
            default: false
        },

        modal: {
            type: Boolean,
            default: false
        },

        format24h: {
            type: Boolean,
            default: true
        },

        placeholderFrom: {
            type: String,
            default: ''
        },

        placeholderTo: {
            type: String,
            default: ''
        },

        floatLabelFrom: {
            type: String,
            default: 'De'
        },

        floatLabelTo: {
            type: String,
            default: 'Até'
        },

        stackLabelFrom: {
            type: String,
            default: ''
        },

        stackLabelTo: {
            type: String,
            default: ''
        },

        color: {
            type: String,
            default: 'primary'
        },

        inverted: {
            type: Boolean,
            default: false
        },

        invertedLight: {
            type: Boolean,
            default: false
        },

        dark: {
            type: Boolean,
            default: false
        },

        alignFrom: {
            type: String,
            default: 'left',
            validator: function (value) {
                return value === 'left' || value === 'center ' || value === 'right'
            }
        },

        alignTo: {
            type: String,
            default: 'left',
            validator: function (value) {
                return value === 'left' || value === 'center ' || value === 'right'
            }
        },

        disable: {
            type: Boolean,
            default: false
        },

        warning: {
            type: Boolean,
            default: false
        },

        error: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            dataValueFrom: '',
            dataValueTo: ''
        }
    },

    computed: {
        formatoDeExibicao(){
            if (this.type === 'date') {
                return 'DD/MM/YYYY'
            }
            if (this.type === 'time') {
                return 'HH:mm:ss'
            }
            if (this.type === 'datetime') {
                return 'DD/MM/YYYY HH:mm:ss'
            }
        }
    },

    watch: {
        value: function(value){
            this.dataValueFrom = value.from
            this.dataValueTo = value.to
        }
    },

    methods: {
        showFrom(){
            this.$refs.dateTimeFrom.show()
        },

        showTo(){
            this.$refs.dateTimeTo.show()
        },

        hideFrom(){
            this.$refs.dateTimeFrom.hide()
        },

        hideTo(){
            this.$refs.dateTimeTo.hide()
        },

        toggleFrom(){
            this.$refs.dateTimeFrom.toggle()
        },

        toggleTo(){
            this.$refs.dateTimeTo.toggle()
        },

        clearFrom(){
            this.$refs.dateTimeFrom.clear()
        },

        clearTo(){
            this.$refs.dateTimeTo.clear()
        },

        $_changeFrom(newValue){
            this.$emit('changeFrom', newValue)
            this.$emit('input', {
                from: newValue,
                to: this.dataValueTo
            })
        },

        $_changeTo(newValue){
            this.$emit('changeTo', newValue)
            this.$emit('input', {
                from: this.dataValueFrom,
                to: newValue
            })
        },

        $_blurFrom(){
            this.$emit('blurFrom')
        },

        $_blurTo(){
            this.$emit('blurTo')
        },

        $_focusFrom(){
            this.$emit('focusFrom')
        },

        $_focusTo(){
            this.$emit('focusTo')
        }
    }
}
</script>

<style lang="scss">

</style>
