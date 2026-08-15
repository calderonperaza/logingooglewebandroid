<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-y-md" style="max-width: 400px; width: 100%">
      <q-btn
        color="white"
        text-color="black"
        icon="person"
        label="Ir a Login"
        no-caps
        class="full-width"
        to="/login"
      />
      <q-btn
        color="white"
        text-color="black"
        icon="lock"
        label="Pagina restringida"
        no-caps
        class="full-width"
        to="/pagina"
      />
    </div>
  </q-page>
</template>
