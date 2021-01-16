const ctx = require.context('./ljxt', true, /\.vue$/)
const routes = {};
 ctx.keys().forEach(key=>{

    const name = key.split("/")[2].split(".")[0];
    routes[name] = ctx(key).default || ctx(key);
   
});
console.log(routes)
export default {
  components: {
     bzmodel,
     ...routes,
  },
}
//批量export js
const ctx = require.context('./store', false, /\.js$/)

const importAll = context => {
    const map = []
  
    for (const key of context.keys()) {
        let b = context(key)
        map.push(b.default)
    }
    
    return map
}
 let model = importAll(ctx)
 console.log(model)
export default model
