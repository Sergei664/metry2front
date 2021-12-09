<template>
    <div>
        <v-form v-model="valid" @keyup.native.enter="valid && authClick()">
            <v-container>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-text-field
                                v-model="email"
                                :rules="[rules.required]"
                                label="E-mail"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Пароль"
                                counter
                                @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-btn color="primary" @click="authClick">Вход</v-btn>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-alert type="error" v-show="errorMsg != ''">
                            {{ errorMsg }}
                        </v-alert>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                show1: false,
                valid: true,
                email: '',
                password: '',
                rules: {
                    required: value => !!value || 'Required.'
                },
                errorMsg: ''
            }
        },
        methods: {
            authClick() {
                if (!this.email || !this.password) {
                    return;
                }
                this.$store.dispatch('AUTH_REQUEST', {email: this.email, password: this.password})
                    .then(() => {
                        this.errorMsg = '';
                    })
                    .catch((e) => {
                        this.errorMsg = e.toString();
                        console.log(e);
                    });
            }
        }
    }
</script>

<style scoped>

</style>