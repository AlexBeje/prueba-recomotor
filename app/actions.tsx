export async function getUsers() {
  return await fetch("https://recomotor-back.alexbeje.dev/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => json);
}

// export async function patchFavorites() {
//   return await fetch(
//     "https://recomotor-back.alexbeje.dev/users/66ac6b5ef4def290859e3042",
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         favorites: [
//           {
//             id: 1,
//             brand: "Seat",
//             model: "Leon",
//           },
//           {
//             id: 2,
//             brand: "Nissan",
//             model: "Juke",
//           },
//         ],
//       }),
//     }
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((json) => json);
// }
