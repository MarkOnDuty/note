<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-action>
            <NuxtLink class="nuxtLink" :to="item.to">
              <v-icon>{{ item.icon }}</v-icon>
            </NuxtLink>
          </v-list-item-action>
          <v-list-item-content>
            <NuxtLink class="nuxtLink" :to="item.to">
              <v-list-item-title v-text="item.title" />
            </NuxtLink>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <NuxtLink class="nuxtLink" to="/signup">
        <v-btn icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </NuxtLink>
      <NuxtLink class="nuxtLink" to="/login">
        <v-btn icon>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </NuxtLink>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Signup',
          to: '/signup'
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/Login'
        }
      ],
      right: true,
      title: 'Note'
    }
  }
}
</script>
