let form = document.getElementById("form");


const retriveEntries = () => {
  let entryst = localStorage.getItem("user-entries");

  if ( entryst) {
     entryst = JSON.parse( entryst);
  } else {
   entryst = [];
  }
  return  entryst;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const  entryst = retriveEntries();

  const rows =  entryst
    .map((Dataput) => {
      const name = `<td class="td">${Dataput.name}</td>`;
      const email = `<td class="td">${Dataput.email}</td>`;
      const password = `<td class="td">${Dataput.password}</td>`;
      const dob = `<td class="td">${Dataput.dob}</td>`;
      const accesptConditions = `<td class="td">${Dataput.accesptConditions}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${accesptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tablent = document.getElementById("tablent");


  tablent.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};

const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let accesptConditions = document.getElementById("att").checked;

  let obj = {
    name,
    email,
    password,
    dob,
    accesptConditions,
  };

  Entries.push(obj);

  localStorage.setItem("user-entries", JSON.stringify(Entries));

  displayEntries();
};

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The Email is not in the right format!!!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}


form.addEventListener("submit", saveUserFrom);

displayEntries();


function FindAge(today, DOFB) {


  var age = today.getFullYear() - DOFB.getFullYear();
  var m = today.getMonth() - DOFB.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < DOFB.getDate())) {
    age--;
  }
  return age;
}



//validating the dob based on the age
let datee = document.getElementById("dob");

datee.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");
  let dob = new Date(year, month, date);
  let Today = new Date();

  age = FindAge(Today, dob);

  datee.style.border = "2px solid black";
  if (age < 18 || age > 55) {
    datee.setCustomValidity("Your age does not lie between 18 and 55");
    datee.style.border = "2px solid red";
    return;
  } else {
    datee.setCustomValidity("");
  }
});
