<template>
    <div>
        <Menu></Menu>
        <Tabs></Tabs>
    </div>
</template>

<script>

    import Tabs from './Tabs.vue';
    import Menu from './Menu.vue';

    export default {
        name: 'LkMain',

        components: {
            Tabs,
            Menu
        },

        data: () => ({
            drawer: false
        }),

        methods: {
            addTab (name, key, component, options) {
                this.$refs.Tabs.addTab(name, key, component, options);
            }
        }
    };
</script>

<style lang="less">
</style>