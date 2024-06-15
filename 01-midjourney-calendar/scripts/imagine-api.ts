 
const data = {
    prompt: "Cinematic Portrait, GodlyBeautiful french supermodel, dynamic lighting, [light + space of James Turrell + Bauhaus architectural forms], BeautyCore, Sharp Details --ar 21:9 --style raw"
};
 
const res = await fetch('https://cl.imagineapi.dev/items/images/', {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    'Authorization': `Bearer ${Bun.env["IMAGINE_API_KEY"]}`,
    'Content-Type': 'application/json'
  }
})
console.log(await res.json())