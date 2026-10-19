/* ============ SETTINGS (edit these) ============ */
const WHATSAPP_NUMBER = "+91 78772 08272";   // country code + number (spaces and + are fine)
const GENERAL_MESSAGE = "Hi! I'm connecting for a reservation at The Glass Box.";
const PHONE_NUMBER = "+91 79471 47478";     // the number the Call buttons dial (include + and country code)
const PHONE_ITEM_LIMIT = 4;                 // on phones, how many dishes to show before the "Show all" button

// WhatsApp links need digits only, so clean the number automatically
const WA_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, "");

/* ============ MENU DATA (add / remove / rename freely) ============ */
// Each category has an icon (used on the tab) and a list of [dish name, emoji].
// PHOTOS: to show a real photo for a dish, save it as  images/menu/<dish-name>.jpg
//   - lowercase, spaces and symbols become "-"   e.g. "Paneer Tikka" -> images/menu/paneer-tikka.jpg
//   - hover over a dish photo area to see the exact file name it looks for
//   - if the file isn't there, the emoji is shown instead
const menu = {
  "Starters": { icon: "🧀", items: [
    ["Paneer Tikka", "🍢"], ["Malai Paneer Tikka", "🧈"], ["Achari Paneer Tikka", "🌶️"], ["French Fries (Plain / Salty)", "🍟"],
    ["Cheesy Fries", "🧀"], ["Peri-Peri Fries", "🔥"], ["Honey Chilli Potato", "🥔"], ["Honey Chilli Cauliflower", "🥦"],
    ["Crunchy Fries Babycorn", "🌽"], ["Nachos with Dips", "🌮"], ["Cheese Loaded Nachos", "🫕"], ["Cigar Roll", "🌯"],
    ["Freshly Prepared Spring Roll", "🥢"], ["Three Pepper Mushroom", "🍄"], ["Chilly Paneer", "🫑"], ["Paneer 65", "🍗"],
    ["Chef Special Crispy Corn", "🍿"] ] },
  "Momos": { icon: "🥟", items: [
    ["Steamed Momos", "🥟"], ["Steamed Cheese and Corn Momos", "🌽"], ["Fried Momos", "🍤"], ["Fried Cheese and Corn Momos", "🧀"],
    ["Schezwan Butter Garlic Momos", "🧄"], ["Pan Fried Momos", "🍳"], ["Crunchy Momos", "🥨"], ["Tandoori Momos", "🔥"],
    ["Cheesy and Buttery White Gravy Momos", "🥛"], ["Afghani Momos", "🥘"], ["Achari Momos", "🌿"], ["TGS Special Multani Momos", "⭐"] ] },
  "Quick Bites": { icon: "🍜", items: [
    ["Pao Bhaji", "🍞"], ["Plain Maggi", "🍜"], ["Tadka Maggi", "🍲"], ["Chinese Maggi", "🥡"], ["Tandoori Maggi", "🌶️"],
    ["Cheese Maggi", "🧀"], ["Veg Roll", "🌯"], ["Chinese Bhel", "🥗"], ["Paneer and Vegetable Roll", "🫔"],
    ["Mushroom Roll", "🍄"], ["Classic Paneer Kathi Roll", "🥙"], ["Veg Kebab Roll", "🍢"] ] },
  "Pasta": { icon: "🍝", items: [
    ["White Parmesan", "🥛"], ["Aglio Olio Pasta Spaghetti", "🧄"], ["Pesto Pasta", "🌿"], ["Pink Sauce Pasta", "🌸"],
    ["Arrabbiata Sauce Pasta", "🌶️"], ["Baked Pasta", "🍝"] ] },
  "Burgers": { icon: "🍔", items: [
    ["Aaloo Tikki Burger", "🥔"], ["Paneer Burger", "🍔"], ["Maharaja Burger", "👑"] ] },
  "Sandwiches": { icon: "🥪", items: [
    ["Grilled Veg Sandwich", "🥪"], ["Grilled Cheese Sandwich", "🧀"], ["Grilled Paneer Sandwich", "🫓"],
    ["Garden Fresh Sandwich", "🥬"], ["Club Sandwich", "🏆"], ["Coleslaw Sandwich", "🥕"] ] },
  "Soups": { icon: "🍲", items: [
    ["Thupka", "🍜"], ["Cream of Tomato", "🍅"], ["Cream of Mushroom", "🍄"], ["Hot and Sour", "🌶️"],
    ["Manchow", "🥢"], ["Lemon and Coriander", "🍋"], ["Thai Soup", "🥥"] ] },
  "Lebanese": { icon: "🧆", items: [
    ["Falafel Platter", "🧆"], ["Falafel Roll", "🌯"], ["Falafel with Pita Bread", "🫓"] ] },
  "Healthy Meals": { icon: "🥗", items: [
    ["Saute Vegetable with Garlic Bread", "🥖"], ["Kimchi", "🥬"], ["Saute Vegetable with Brown Rice", "🍚"],
    ["Greek Salad", "🫒"], ["Caesar Salad", "🥗"], ["Green Salad", "🥒"] ] },
  "Shakes": { icon: "🥤", items: [
    ["Classic Frappe", "🧋"], ["Kit Kat Shake", "🍫"], ["Chocolate Oreo Shake", "🍪"], ["Chocolate Hazelnut Shake", "🌰"],
    ["Dark Chocolate Shake", "🖤"], ["Nutella Shake", "🥜"], ["Ferrero Rocher Shake", "🍬"], ["Vanilla Shake", "🍦"],
    ["Paan Shake", "🍃"], ["Strawberry Shake", "🍓"], ["Butterscotch Shake", "🍯"], ["Pineapple Shake", "🍍"] ] },
  "Slush": { icon: "🍧", items: [
    ["Orange Slush", "🍊"], ["Coconut Slush", "🥥"], ["Kiwi Slush", "🥝"], ["Kaccha Aam Slush", "🍏"],
    ["Pineapple Slush", "🍧"], ["Litchi Slush", "🌺"], ["Mango Slush", "🥭"] ] },
  "Ice Tea": { icon: "🧊", items: [
    ["Lemon Mint Ice Tea", "🍋"], ["Black Currant Ice Tea", "🫐"], ["Green Apple Ice Tea", "🍏"], ["Orange Ice Tea", "🍊"],
    ["Mango Ice Tea", "🥭"], ["Watermelon Ice Tea", "🍉"], ["Cranberry Ice Tea", "🍒"], ["Peach Ice Tea", "🍑"],
    ["Pineapple Ice Tea", "🍍"], ["Redbull Ice Tea", "⚡"] ] },
  "Mojitos": { icon: "🍹", items: [
    ["Masala Lemonade", "🥤"], ["Virgin Mojito", "🌿"], ["Green Apple Mojito", "🍏"], ["Cranberry Mojito", "🍒"],
    ["Sex on the Beach", "🏖️"] ] },
  "Hot Drinks": { icon: "☕", items: [
    ["Hand-beaten Coffee", "☕"], ["Masala Tea", "🫖"], ["Cinnamon Tea", "🍂"], ["Ginger Tea", "🌱"],
    ["Green Tea", "🍵"], ["Honey Ginger Lemon Tea", "🍯"] ] }
};

/* ============ CART ============ */
let cart = {};            // looks like { "Paneer Tikka": 2, "Virgin Mojito": 1 }
let activeCategory = Object.keys(menu)[0];

function addItem(name)        { cart[name] = (cart[name] || 0) + 1; refresh(true); }
function changeQty(name, d)   { cart[name] = (cart[name] || 0) + d; if (cart[name] <= 0) delete cart[name]; refresh(true); }
function totalItems()         { return Object.values(cart).reduce((a, b) => a + b, 0); }

// One small helper that draws either an "Add" button or a  − 1 +  stepper
function qtyControl(name) {
  if (!cart[name]) return `<button class="add-btn" data-act="add" data-name="${name}">+ Add</button>`;
  return `<div class="qty"><button data-act="minus" data-name="${name}">−</button>${cart[name]}<button data-act="plus" data-name="${name}">+</button></div>`;
}

/* ============ DRAW THE MENU ============ */
const tabsBox  = document.getElementById("menu-tabs");
const titleBox = document.getElementById("menu-title");
const listBox  = document.getElementById("menu-list");
const showAllBox = document.getElementById("show-all");

let showAll = false;                                  // has the customer tapped "Show all"?
const phoneQuery = matchMedia("(max-width: 600px)");  // true on phones

function drawTabs() {
  tabsBox.innerHTML = Object.keys(menu).map(c =>
    `<button class="tab ${c === activeCategory ? "active" : ""}" data-cat="${c}">${menu[c].icon} ${c}</button>`).join("");
}
function slug(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }   // "Paneer Tikka" -> "paneer-tikka"
// animate = play the pop-in animation, fromIndex = first dish that should animate
function drawMenu(animate, fromIndex = 0) {
  const cat = menu[activeCategory];
  titleBox.textContent = activeCategory;

  // On phones, show only the first few dishes until "Show all" is tapped
  const isLong = phoneQuery.matches && cat.items.length > PHONE_ITEM_LIMIT;
  const visible = isLong && !showAll ? cat.items.slice(0, PHONE_ITEM_LIMIT) : cat.items;

  listBox.innerHTML = visible.map(([name, emoji], i) => `
    <div class="menu-item glow-card" style="${animate && i >= fromIndex ? `animation-delay:${(i - fromIndex) * 40}ms` : "animation:none"}">
      <div class="thumb">
        <span class="emoji">${emoji}</span>
        <img src="images/menu/${slug(name)}.jpg" alt="${name}" title="Photo file: images/menu/${slug(name)}.jpg" loading="lazy" onerror="this.remove()">
      </div>
      <div class="name">${name}</div>
      ${qtyControl(name)}
    </div>`).join("");

  // the button under the list
  showAllBox.innerHTML = !isLong ? "" : showAll
    ? `<button class="btn btn-ghost" data-act="less">Show less ↑</button>`
    : `<button class="btn btn-ghost" data-act="more">Show all ${cat.items.length} items ↓</button>`;
}
tabsBox.addEventListener("click", e => {
  const t = e.target.closest(".tab"); if (!t) return;
  activeCategory = t.dataset.cat; showAll = false; drawTabs(); drawMenu(true);   // new category starts collapsed
});
showAllBox.addEventListener("click", e => {
  const b = e.target.closest("button[data-act]"); if (!b) return;
  if (b.dataset.act === "more") { showAll = true; drawMenu(true, PHONE_ITEM_LIMIT); }   // only the newly revealed dishes animate
  else { showAll = false; drawMenu(false); document.getElementById("menu").scrollIntoView(); }
});
phoneQuery.addEventListener("change", () => drawMenu(false));   // redraw if the screen size changes (e.g. rotating the phone)
listBox.addEventListener("click", handleQtyClick);

/* ============ DRAW THE CART ============ */
const cartItems = document.getElementById("cart-items");
function drawCart() {
  const names = Object.keys(cart);
  cartItems.innerHTML = names.length
    ? names.map(n => `<div class="cart-row"><span>${n}</span>${qtyControl(n)}</div>`).join("")
    : `<p class="empty">Your cart is empty.<br>Add something tasty from the menu 🍽️</p>`;
  document.getElementById("cart-count").textContent = totalItems();
  document.getElementById("checkout-btn").disabled = names.length === 0;
  document.getElementById("checkout-btn").style.opacity = names.length ? 1 : .5;
}
cartItems.addEventListener("click", handleQtyClick);

function handleQtyClick(e) {
  const b = e.target.closest("button[data-act]"); if (!b) return;
  const name = b.dataset.name;
  if (b.dataset.act === "add" || b.dataset.act === "plus") changeQty(name, 1);
  else changeQty(name, -1);
}
function refresh(bump) {
  drawMenu(false); drawCart();
  if (bump) { const btn = document.getElementById("cart-btn"); btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump"); }
}

/* ============ OPEN / CLOSE THE DRAWER ============ */
const drawer = document.getElementById("drawer"), overlay = document.getElementById("overlay");
function showView(id) { document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === id)); }
function openDrawer()  { showView("cart-view"); drawer.classList.add("open"); overlay.classList.add("open"); }
function closeDrawer() { drawer.classList.remove("open"); overlay.classList.remove("open"); }
document.getElementById("cart-btn").onclick = openDrawer;
document.getElementById("close-1").onclick = closeDrawer;
document.getElementById("close-2").onclick = closeDrawer;
overlay.onclick = closeDrawer;
document.getElementById("checkout-btn").onclick = () => showView("reserve-view");
document.getElementById("back-btn").onclick = () => showView("cart-view");

/* ============ RESERVATION → WHATSAPP ============ */
document.getElementById("reserve-form").addEventListener("submit", e => {
  e.preventDefault();
  const name   = document.getElementById("r-name").value.trim();
  const guests = document.getElementById("r-guests").value;
  const date   = document.getElementById("r-date").value.trim();   // whatever the customer typed
  const time   = document.getElementById("r-time").value.trim();

  // This is the exact text that appears, ready to send, inside WhatsApp. Edit the wording here.
  let msg = "Hi The Glass Box! I'd like to reserve a table 🌙\n\n";
  if (name) msg += `Name: ${name}\n`;
  msg += `Guests: ${guests}\nDate: ${date}\nTime: ${time}\n\nOrder:\n`;
  msg += Object.entries(cart).map(([item, qty]) => `• ${qty} x ${item}`).join("\n");

  window.open(`https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* ============ NORMAL WHATSAPP BUTTONS ============ */
document.querySelectorAll(".whatsapp-link").forEach(a =>
  a.href = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(GENERAL_MESSAGE)}`);

/* ============ CALL BUTTONS (opens the phone's dialer with the number filled in) ============ */
document.querySelectorAll(".call-link").forEach(a => a.href = "tel:" + PHONE_NUMBER.replace(/\s/g, ""));

/* ============ HERO DECORATIONS (stars, clouds, fireflies, string lights) ============ */
const sky = document.getElementById("sky");
for (let i = 0; i < 60; i++) {                            // stars
  const s = document.createElement("div"); s.className = "star";
  const size = Math.random() * 2 + 1;
  s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 75}%;width:${size}px;height:${size}px;animation-delay:${Math.random() * 3}s`;
  sky.appendChild(s);
}
for (let i = 0; i < 3; i++) {                             // clouds
  const c = document.createElement("div"); c.className = "cloud";
  c.style.cssText = `top:${15 + i * 22}%;animation-duration:${50 + i * 25}s;animation-delay:-${i * 20}s`;
  sky.appendChild(c);
}
for (let i = 0; i < 14; i++) {                            // fireflies
  const f = document.createElement("div"); f.className = "firefly";
  f.style.cssText = `left:${Math.random() * 100}%;top:${50 + Math.random() * 45}%;animation-delay:${Math.random() * 9}s;animation-duration:${7 + Math.random() * 6}s`;
  sky.appendChild(f);
}
const bulbColors = ["#ffd23f", "#ff9eb5", "#7fd6ff", "#9dffb0"];
const lights = document.getElementById("lights");
for (let i = 0; i < 16; i++) {                            // string lights
  const b = document.createElement("span");
  b.style.setProperty("--c", bulbColors[i % bulbColors.length]);
  b.style.animationDelay = (i * 0.3) + "s";
  lights.appendChild(b);
}

/* ============ FADE-IN ON SCROLL ============ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("show"); observer.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + "ms"; observer.observe(el); });

/* ============ GALLERY SLIDER ============ */
const slides = [...document.querySelectorAll(".slide")];
const dotsBox = document.getElementById("dots");
const slider = document.querySelector(".slider");
let current = 0, timer;

slides.forEach((slide, i) => {
  const dot = document.createElement("button");
  dot.onclick = () => goTo(i);
  dotsBox.appendChild(dot);
  slide.onclick = () => goTo(i);                 // click a side slide to bring it to the front
});

function goTo(i) { current = (i + slides.length) % slides.length; renderSlider(); }

function renderSlider() {
  slides.forEach((slide, i) => {
    let offset = i - current;                    // 0 = centre, -1 = left, +1 = right ...
    if (offset > slides.length / 2) offset -= slides.length;
    if (offset < -slides.length / 2) offset += slides.length;
    const far = Math.abs(offset);
    slide.style.transform = `translateX(calc(-50% + ${offset * 58}%)) translateZ(${-far * 140}px) rotateY(${-offset * 30}deg) scale(${1 - far * 0.1})`;
    slide.style.zIndex = 10 - far;
    slide.style.opacity = far > 2 ? 0 : 1 - far * 0.25;
    slide.classList.toggle("active", offset === 0);
  });
  [...dotsBox.children].forEach((d, i) => d.classList.toggle("active", i === current));
}

document.getElementById("prev").onclick = () => goTo(current - 1);
document.getElementById("next").onclick = () => goTo(current + 1);

// auto-play: moves every 4.5s, pauses while hovering or touching
function startAuto() { stopAuto(); timer = setInterval(() => goTo(current + 1), 4500); }
function stopAuto()  { clearInterval(timer); }
slider.addEventListener("mouseenter", stopAuto);
slider.addEventListener("mouseleave", startAuto);

// swipe on phones
let touchX = 0;
slider.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; stopAuto(); }, { passive: true });
slider.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - touchX;
  if (Math.abs(diff) > 40) goTo(current + (diff < 0 ? 1 : -1));
  startAuto();
});

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) startAuto();
renderSlider();

/* ============ START ============ */
drawTabs(); drawMenu(true); drawCart();