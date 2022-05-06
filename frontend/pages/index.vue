<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Note - A simple note taking app
        </v-card-title>
        <v-card-text>
          <p>
            Note is a simple note-taking app. Very simple. Like, the
            simplest you could imagine. {{ $config.apiGateway.REGION }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
