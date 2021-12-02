<template>
    <section class="container">
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <form @submit.prevent="submitForm">
            <div class="form-control" v-if="mode == 'signup'">
                <label for="name">Name</label>
                <input type="text" id="name" v-model.trim="name">
            </div>
            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" id="email" v-model.trim="email">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="password">
            </div>
            <div class="button-group">
                <button type="submit">{{authText}}</button>
                <a @click="toggleAuthMode">{{altAuthText}}</a>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
            mode: 'login',
            error: null
        }
    },
    computed: {
        authText() {
            if (this.mode == 'login') {
                return 'Login';
            }
            return 'Sign Up';
        },
        altAuthText() {
            if (this.mode == 'login') {
                return 'Sign Up instead';
            }
            return 'Login instead';
        }
    },
    methods: {
        async submitForm() {
            try {
                if (this.mode == 'login') {
                    await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password
                    });
                } else {
                    await this.$store.dispatch('signup', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    });
                }

                this.$router.replace('/play');
            } catch (err) {
                this.error = err.message || 'Failed';
            }
            
        },
        toggleAuthMode() {
            if (this.mode == 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

a {
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}

@media (max-width: 767px) {
    .button-group {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>