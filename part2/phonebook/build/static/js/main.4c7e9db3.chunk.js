(this.webpackJsonpanecdotes=this.webpackJsonpanecdotes||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t(1),r=t(14),u=t.n(r),o=t(3),i=function(e){var n=e.value,t=e.handleChange;return Object(c.jsxs)("div",{children:["filter shown with:"," ",Object(c.jsx)("input",{value:n,onChange:t})]})},s=function(e){var n=e.nameValue,t=e.numberValue,a=e.handleSubmit,r=e.handleNameChange,u=e.handleNumberChange;return Object(c.jsxs)("form",{onSubmit:a,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:n,onChange:r})]}),Object(c.jsxs)("div",{children:["number:"," ",Object(c.jsx)("input",{value:t,onChange:u})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.persons,t=e.handleDelete;return Object(c.jsx)("div",{children:n.map((function(e){return Object(c.jsxs)("p",{children:[e.name," ",e.number," ",Object(c.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.id)}))})},l=function(e){var n=e.success,t=e.message,a=t?"block":"none";return n?Object(c.jsx)("div",{className:"success",style:{display:a},children:t}):Object(c.jsx)("div",{className:"error",style:{display:a},children:t})},h=t(4),b=t.n(h),j="/api/persons",f={getAll:function(){return b.a.get(j).then((function(e){return e.data}))},create:function(e){return b.a.post(j,e).then((function(e){return e.data}))},update:function(e,n){return b.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},deleteId:function(e){return b.a.delete("".concat(j,"/").concat(e),{params:{id:e}})}},m=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),h=Object(o.a)(u,2),b=h[0],j=h[1],m=Object(a.useState)(""),O=Object(o.a)(m,2),p=O[0],v=O[1],x=Object(a.useState)(""),g=Object(o.a)(x,2),w=g[0],C=g[1],y=Object(a.useState)(null),S=Object(o.a)(y,2),k=S[0],N=S[1],D=Object(a.useState)(!1),V=Object(o.a)(D,2),A=V[0],I=V[1],E=""===w?t:t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())})),J=function(){f.getAll().then((function(e){return r(e)})).catch((function(){I(!1),L("Failed to get the numbers from the server")}))};Object(a.useEffect)((function(){J()}),[]);var L=function(e){N(e),setTimeout((function(){N(null)}),3e3)};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(i,{value:w,handleChange:function(e){C(e.target.value)}}),Object(c.jsx)("h3",{children:"Add new"}),Object(c.jsx)(s,{nameValue:b,numberValue:p,handleSubmit:function(e){e.preventDefault();var n=t.map((function(e){return e.name})),c={name:b,number:p};if(n.includes(b)){var a="".concat(b," is already added to the phonebook. Replace the old number with the new one?");if(window.confirm(a)){var u=t.find((function(e){return e.name===b})).id;f.update(u,c).then((function(e){r(t.map((function(n){return n.id!==u?n:e}))),I(!0),L("Successfully updated the number of ".concat(b))})).catch((function(e){I(!1),L(e.response.data.error),J()}))}}else f.create(c).then((function(e){r(t.concat(e)),j(""),v(""),I(!0),L("Successfully added ".concat(b," to the phonebook"))})).catch((function(e){I(!1),L(e.response.data.error),J()}))},handleNameChange:function(e){j(e.target.value)},handleNumberChange:function(e){v(e.target.value)}}),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(l,{success:A,message:k}),Object(c.jsx)(d,{persons:E,handleDelete:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Do you really want to delete ".concat(n," from the phonebook?"))&&f.deleteId(e).then((function(e){var n=e.config.params.id,c=t.filter((function(e){return e.id!==n}));r(c)})).catch((function(e){I(!1),L(e.response.data.error)}))}})]})};t(38);u.a.render(Object(c.jsx)(m,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.4c7e9db3.chunk.js.map