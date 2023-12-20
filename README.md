# ariel-app

## Project setup
```
npm install
```

## Update Firebase Config with your own
```
Go to src/firebase/index.js then replace the const firebaseConfig = {}
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Some Tutorial Guide

1. Firebase Link: https://firebase.google.com/
2. Register your firebase as web 
3. Create a firestore database 
4. Create a firestore collection 
5. Install Vue CLI
   Tutorial: https://medium.com/free-code-camp/learn-how-to-use-the-vue-js-cli-8349fb23a566
   1. npm install -g @vue/cli (Optional)
   2. vue create folder-name (Required)
   3. cd folder-name(imong folder name)
   4. Open Terminal in VSCode then type npm run serve to run your app.
6. Create UI in src/views/AboutView.vue 
   1. Sample HTML Table: https://www.w3schools.com/html/tryit.asp?filename=tryhtml_table_intro
7. Create a connection between your Vue App and Firebase - 
   1. Main Docu: https://firebase.google.com/docs/firestore
   2. Get real-time updates: https://firebase.google.com/docs/firestore/query-data/listen
8. Then can start developing the CRUD, refer to the code in src/views/StudentView.vue
