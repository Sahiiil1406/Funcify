const add=(a,b,c)=>{
    return a-b+c;

}
const envd=process.env.PAYLOAD;
const input=JSON.parse(envd)
console.log(add(input.a,input.b,input.c))