$("div#menu>nav>ul>li").on("mouseenter", (elem) => {
  elem.target.className = "li-hover";
});
$("div#menu>nav>ul>li").on("mouseleave", (elem) => {
  elem.target.className = "";
});
$("li[name=home]").on("mouseenter", function () {
  $("div#submenu-1").css({
    display: "flex",
  });
});
$("div#submenu-1").on("mouseleave", function () {
  $("div#submenu-1").css({
    display: "none",
  });
});
const subject = async () => {
  try {
    let response = await fetch("http://localhost:3000/titles");
    let data = await response.json();
    let html = "";
    data.forEach((elem) => {
      html += `<div><h3>${elem.subject}</h3></div>`;
    });
    document.querySelector("div#submenu-1").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};
subject();
const sliderImage = async () => {
  try {
    let response = await fetch("http://localhost:3000/posts");
    let data = await response.json();
    let html = "";
    let id = 0;
    data.forEach((elem) => {
      html += `
            <img src="${elem.img}" alt="${elem.alt}" name="slider-image" id=${id} />
            `;
      id += 1;
    });
    document.querySelector("div[name=slider-image]").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};
sliderImage();
const product = async () => {
  let response = await fetch("http://localhost:3000/products");
  let data = await response.json();
  let html = "";
  data.forEach((elem) => {
    html += `
    <div name="product">
    <h3>${elem.title}</h3>
    <img src="${elem.img} alt="${elem.alt}"/>
    <p>${elem.description}</p>
    <button class="button">purchase</button>
    </div>    
    `;
  });
  document.querySelector("div#introduction").innerHTML = html;
};
product();

$("body").on("click", ".button", function (elem) {
  document.querySelector("div[name=customerForm]").style.display = "block";
  document.querySelector("div[name=customerForm]").style.left = "0";
});

$("div[name=close-1]").css({
  backgroundColor: "red",
  position: "absolute",
  top: "0",
  right: "0",
  fontSize: "30px",
  width: "40px",
  height: "40px",
  paddingLeft: "12px",
  paddingTop: "3px",
  cursor: "pointer",
  color: "white",
});
$("div[name=close-1]").on("click", () => {
  $("div[name=customerForm]").css({
    display: "none",
  });
});

const postData = async () => {
  try {
    let firstName = document.querySelector("input[name=firstName]").value;
    let lastName = document.querySelector("input[name=lastName]").value;
    let email = document.querySelector("input[name=email]").value;
    let comment = document.querySelector("textarea[name=comment]").value;
    fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        product: comment,
      }),
    });
    firstName = "";
    lastName = "";
    email = "";
    comment = "";
  } catch (error) {
    alert(error);
  }
};
document.querySelector("div[name=submit]").addEventListener("click", (elem) => {
  elem.preventDefault();
  postData();
});

const subjectFooter = async () => {
  try {
    let response = await fetch("http://localhost:3000/titles");
    let data = await response.json();
    let html = "`<h1>usfull links</h1>`";
    data.forEach((elem) => {
      html += `<h3>${elem.subject}</h3>`;
    });
    document.querySelector("div#guide").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};
subjectFooter();
let count = 1;

$("body").on("click", "img[name=slider-image]", (elem) => {
  if (count === 3) {
    elem.target.style.display = "none";
    let html = `<button name="again">Again!</button>`;
    document.querySelector("div[name=slider-image]").innerHTML = html;
    document.querySelector("div[name=slider-image]").style.backgroundColor="#2b2b2b"
    console.log(count);
    count = 1;
  } else {
    console.log(count);
    elem.target.style.display = "none";
    count += 1;
  }
});

$("body").on("click", "[name=again]", (elem) => {
  sliderImage();
});
