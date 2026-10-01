const CART_KEY = 'pujasFoodCart';
const WARUNG_DATA_KEY = 'pujasFoodWarungs';
const FAVORITES_DATA_KEY = 'pujasFoodFavorites';
const readStoredData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
};
const foodPhotos = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80'
];

const defaultWarungs = [
  { name: 'Kedai Berkah', type: 'Masakan rumahan', location: 'Area tengah', description: 'Masakan tradisional dengan bumbu yang akrab di lidah.', image: 'kedai-berkah.jpg', menu: [
    { name: 'Nasi Ayam Geprek', price: 10000, category: 'Makanan utama' }, { name: 'Nasi Pecel', price: 10000, category: 'Makanan utama' }, { name: 'Nasi Campur', price: 12000, category: 'Makanan utama' }, { name: 'Tahu Telur', price: 10000, category: 'Makanan utama' }
  ] },
  { name: 'Warung Blepotan', type: 'Camilan & es', location: 'Area timur', description: 'Jajanan manis dan minuman segar untuk teman santai.', image: 'warung-blepotan.jpeg', menu: [
    { name: 'Es Krim Crunchy', price: 10000, category: 'Camilan' }, { name: 'Es Cappuccino Cincau', price: 12000, category: 'Minuman' }, { name: 'Es Teler', price: 14000, category: 'Minuman' }, { name: 'Roti Es Krim', price: 10000, category: 'Camilan' }
  ] },
  { name: 'Warung Bakso Utomo', type: 'Bakso & mi', location: 'Area utara', description: 'Bakso sapi dan mi ayam dengan kuah kaldu hangat.', image: 'warung-bakso-utomo.jpeg', menu: [
    { name: 'Mie Ayam', price: 10000, category: 'Makanan utama' }, { name: 'Mie Ayam Bakso', price: 15000, category: 'Makanan utama' }, { name: 'Bakso Sapi', price: 14000, category: 'Makanan utama' }, { name: 'Bakso Bakar', price: 12000, category: 'Camilan' }
  ] },
  { name: 'Kedai JOSJISJUS', type: 'Jus buah', location: 'Area selatan', description: 'Jus buah segar dibuat saat dipesan, tanpa banyak drama.', image: 'warung-josjisjus.jpeg', menu: [
    { name: 'Jus Jambu', price: 9000, category: 'Minuman' }, { name: 'Jus Alpukat', price: 12000, category: 'Minuman' }, { name: 'Jus Jeruk', price: 9000, category: 'Minuman' }, { name: 'Jus Apel', price: 10000, category: 'Minuman' }
  ] },
  { name: 'Warung Bu Indah', type: 'Lauk & nasi', location: 'Area barat', description: 'Menu nasi dan lauk rumahan dengan pilihan sambal.', image: 'warung-bu-indah.jpeg', menu: [
    { name: 'Nasi Ayam Bakar', price: 16000, category: 'Makanan utama' }, { name: 'Nasi Ayam Pedas', price: 15000, category: 'Makanan utama' }, { name: 'Nasi Lele', price: 13000, category: 'Makanan utama' }, { name: 'Nasi Telur Dadar', price: 10000, category: 'Makanan utama' }
  ] },
  { name: 'Warung Mbak El', type: 'Soto & mi', location: 'Area tengah', description: 'Soto hangat dan hidangan berkuah, pas untuk kapan saja.', image: 'warung-mbak-el.jpeg', menu: [
    { name: 'Nasi Soto Lamongan', price: 15000, category: 'Makanan utama' }, { name: 'Nasi Soto Daging', price: 18000, category: 'Makanan utama' }, { name: 'Mie Ayam', price: 10000, category: 'Makanan utama' }, { name: 'Bakso Malang', price: 15000, category: 'Makanan utama' }
  ] }
];

const defaultFavorites = [
  { warung: 0, menu: 0, tag: 'Favorit pelanggan', image: 'nasi-ayam-geprek.jpeg' },
  { warung: 2, menu: 1, tag: 'Porsi mantap', image: 'mi-ayam-bakso.jpeg' },
  { warung: 0, menu: 1, tag: 'Pilihan klasik', image: 'nasi-pecel.jpeg' },
  { warung: 1, menu: 2, tag: 'Segar hari ini', image: 'es-teler.jpeg' }
];

function normalizeWarungs(storedWarungs) {
  return defaultWarungs.map((warung, index) => {
    const storedMenu = storedWarungs?.[index]?.menu;
    const menu = Array.isArray(storedMenu) ? storedMenu : warung.menu;
    return {
      ...warung,
      menu: menu.filter((item) => item && typeof item.name === 'string' && typeof item.category === 'string' && item.price !== '' && Number.isFinite(Number(item.price)))
        .map((item) => ({ ...item, name: item.name.trim(), category: item.category.trim(), price: Number(item.price) }))
        .filter((item) => item.name && item.category && item.price >= 0)
    };
  });
}

let warungs = normalizeWarungs(readStoredData(WARUNG_DATA_KEY));
const saveWarungs = () => localStorage.setItem(WARUNG_DATA_KEY, JSON.stringify(warungs));
let favorites = (Array.isArray(readStoredData(FAVORITES_DATA_KEY)) ? readStoredData(FAVORITES_DATA_KEY) : defaultFavorites)
  .filter((favorite) => Number.isInteger(favorite?.warung) && Number.isInteger(favorite?.menu) && warungs[favorite.warung]?.menu[favorite.menu] && typeof favorite.tag === 'string' && typeof favorite.image === 'string')
  .map((favorite) => ({ ...favorite }));
const saveFavorites = () => localStorage.setItem(FAVORITES_DATA_KEY, JSON.stringify(favorites));

const rupiah = (amount) => `Rp${Number(amount).toLocaleString('id-ID')}`;
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const getCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter((item) => item && item.id && Number(item.quantity) > 0) : [];
  } catch {
    return [];
  }
};
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
};
const updateCartCount = () => {
  const count = getCart().reduce((total, item) => total + Number(item.quantity), 0);
  document.querySelectorAll('#cartCount').forEach((element) => { element.textContent = count; });
};
const getMenuItem = (warungIndex, menuIndex) => {
  const warung = warungs[warungIndex];
  const menu = warung?.menu[menuIndex];
  return warung && menu ? { id: `${warungIndex}-${menuIndex}`, name: menu.name, warung: warung.name, price: menu.price, image: menu.image || warung.image } : null;
};
const addToCart = (item, quantity = 1) => {
  if (!item || !Number.isFinite(quantity) || quantity < 1) return;
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) existing.quantity += quantity;
  else cart.push({ ...item, quantity });
  saveCart(cart);
  showToast(`${item.name} ditambahkan ke keranjang`);
};
const showToast = (message) => {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2000);
};

function renderWarungs() {
  const target = document.getElementById('warungList');
  if (!target) return;
  target.innerHTML = warungs.map((warung, index) => `
    <article class="stall-card">
      <a href="detail.html?id=${index}" aria-label="Lihat menu ${escapeHTML(warung.name)}">
        <img class="stall-photo" src="${escapeHTML(warung.image)}" alt="Hidangan dari ${escapeHTML(warung.name)}" loading="lazy">
        <div class="stall-body"><div class="stall-meta"><span class="stall-type">${escapeHTML(warung.type)}</span><span>${escapeHTML(warung.location)}</span></div>
          <h3>${escapeHTML(warung.name)}</h3><p>${escapeHTML(warung.description)}</p>
          <div class="stall-foot"><span>${warung.menu.length} menu tersedia</span><span>Lihat warung <span aria-hidden="true">→</span></span></div>
        </div>
      </a>
    </article>`).join('');
}

function renderFavorites() {
  const target = document.getElementById('popularMenuList');
  if (!target) return;
  target.innerHTML = favorites.map((favorite) => {
    const item = getMenuItem(favorite.warung, favorite.menu);
    if (!item) return '';
    return `<article class="favorite-card"><img src="${escapeHTML(favorite.image)}" alt="${escapeHTML(item.name)}" loading="lazy"><div class="favorite-info">
      <small>${escapeHTML(favorite.tag)}</small><h3>${escapeHTML(item.name)}</h3><div class="favorite-order"><strong>${rupiah(item.price)}</strong>
      <div class="add-order-control"><input class="quantity-input" type="number" min="1" max="99" step="1" value="1" aria-label="Jumlah ${escapeHTML(item.name)}">
      <button class="add-button" type="button" data-add-item="${item.id}">Tambah +</button></div></div></div></article>`;
  }).join('');
}

function resetManagerForm() {
  const form = document.getElementById('managerMenuForm');
  if (!form) return;
  form.reset();
  document.getElementById('managerMenuIndex').value = '';
  document.getElementById('managerFormTitle').textContent = 'Tambah menu';
  document.getElementById('managerFavoriteTag').value = 'Menu favorit';
}

function renderMenuManager() {
  const select = document.getElementById('managerWarung');
  const target = document.getElementById('managerMenuList');
  if (!select || !target) return;
  const selectedIndex = Number(select.value);
  select.innerHTML = warungs.map((warung, index) => `<option value="${index}">${escapeHTML(warung.name)}</option>`).join('');
  select.value = warungs[selectedIndex] ? String(selectedIndex) : '0';
  const warungIndex = Number(select.value);
  const warung = warungs[warungIndex];
  target.innerHTML = warung.menu.length ? warung.menu.map((item, menuIndex) => {
    const favorite = favorites.find((entry) => entry.warung === warungIndex && entry.menu === menuIndex);
    const favoriteLabel = favorite ? ` · Favorit: ${escapeHTML(favorite.tag)}` : '';
    return `<article class="manager-menu-item"><div><strong>${escapeHTML(item.name)}</strong><p>${escapeHTML(item.category)} · ${rupiah(item.price)}${favoriteLabel}</p></div>
      <div class="manager-menu-actions"><button class="manager-secondary" type="button" data-edit-menu="${menuIndex}">Ubah</button><button class="manager-danger" type="button" data-delete-menu="${menuIndex}">Hapus</button></div></article>`;
  }).join('') : '<p class="manager-empty">Belum ada menu untuk warung ini.</p>';
}

function editManagerMenu(menuIndex) {
  const warungIndex = Number(document.getElementById('managerWarung')?.value);
  const item = warungs[warungIndex]?.menu[menuIndex];
  if (!item) return;
  const favorite = favorites.find((entry) => entry.warung === warungIndex && entry.menu === menuIndex);
  document.getElementById('managerMenuIndex').value = menuIndex;
  document.getElementById('managerMenuName').value = item.name;
  document.getElementById('managerMenuCategory').value = item.category;
  document.getElementById('managerMenuPrice').value = item.price;
  document.getElementById('managerMenuImage').value = item.image || favorite?.image || warungs[warungIndex].image;
  document.getElementById('managerFavorite').checked = Boolean(favorite);
  document.getElementById('managerFavoriteTag').value = favorite?.tag || 'Menu favorit';
  document.getElementById('managerFormTitle').textContent = 'Ubah menu';
  document.getElementById('managerMenuName').focus();
}

function updateFavoriteTagVisibility() {
  const favoriteCheckbox = document.getElementById('managerFavorite');
  const favoriteTag = document.querySelector('.manager-favorite-tag');
  if (favoriteCheckbox && favoriteTag) favoriteTag.hidden = !favoriteCheckbox.checked;
}

function saveManagerMenu(event) {
  event.preventDefault();
  const warungIndex = Number(document.getElementById('managerWarung').value);
  const warung = warungs[warungIndex];
  const menuIndexValue = document.getElementById('managerMenuIndex').value;
  const menuIndex = menuIndexValue === '' ? warung?.menu.length : Number(menuIndexValue);
  const name = document.getElementById('managerMenuName').value.trim();
  const category = document.getElementById('managerMenuCategory').value.trim();
  const price = Number(document.getElementById('managerMenuPrice').value);
  const image = document.getElementById('managerMenuImage').value.trim();
  if (!warung || !name || !category || !Number.isFinite(price) || price < 0 || !Number.isInteger(menuIndex)) return;

  warung.menu[menuIndex] = { name, category, price, ...(image ? { image } : {}) };
  saveWarungs();

  const existingFavoriteIndex = favorites.findIndex((favorite) => favorite.warung === warungIndex && favorite.menu === menuIndex);
  if (document.getElementById('managerFavorite').checked) {
    const favorite = { warung: warungIndex, menu: menuIndex, tag: document.getElementById('managerFavoriteTag').value.trim() || 'Menu favorit', image: image || warung.image };
    if (existingFavoriteIndex >= 0) favorites[existingFavoriteIndex] = favorite;
    else favorites.push(favorite);
  } else if (existingFavoriteIndex >= 0) {
    favorites.splice(existingFavoriteIndex, 1);
  }
  saveFavorites();

  const itemId = `${warungIndex}-${menuIndex}`;
  const cart = getCart().map((item) => item.id === itemId ? { ...item, name, warung: warung.name, price, image: image || warung.image } : item);
  saveCart(cart);
  renderWarungs();
  renderFavorites();
  renderDetail();
  renderCart();
  renderCheckout();
  renderMenuManager();
  resetManagerForm();
  updateFavoriteTagVisibility();
  showToast('Menu berhasil disimpan');
}

function deleteManagerMenu(menuIndex) {
  const warungIndex = Number(document.getElementById('managerWarung').value);
  const warung = warungs[warungIndex];
  const item = warung?.menu[menuIndex];
  if (!item || !window.confirm(`Hapus menu "${item.name}"?`)) return;

  warung.menu.splice(menuIndex, 1);
  favorites = favorites.filter((favorite) => favorite.warung !== warungIndex || favorite.menu !== menuIndex)
    .map((favorite) => favorite.warung === warungIndex && favorite.menu > menuIndex ? { ...favorite, menu: favorite.menu - 1 } : favorite);
  saveWarungs();
  saveFavorites();

  const cart = getCart().flatMap((entry) => {
    const [entryWarung, entryMenu] = String(entry.id).split('-').map(Number);
    if (entryWarung !== warungIndex) return [entry];
    if (entryMenu === menuIndex) return [];
    const nextMenuIndex = entryMenu > menuIndex ? entryMenu - 1 : entryMenu;
    const nextMenu = warung.menu[nextMenuIndex];
    return nextMenu ? [{ ...entry, id: `${warungIndex}-${nextMenuIndex}`, name: nextMenu.name, warung: warung.name, price: nextMenu.price, image: nextMenu.image || warung.image }] : [];
  });
  saveCart(cart);
  renderWarungs();
  renderFavorites();
  renderDetail();
  renderCart();
  renderCheckout();
  renderMenuManager();
  resetManagerForm();
  updateFavoriteTagVisibility();
  showToast('Menu berhasil dihapus');
}

function resetMenuData() {
  if (!window.confirm('Pulihkan menu dan favorit bawaan? Keranjang juga akan dikosongkan.')) return;
  localStorage.removeItem(WARUNG_DATA_KEY);
  localStorage.removeItem(FAVORITES_DATA_KEY);
  warungs = normalizeWarungs(null);
  favorites = defaultFavorites.map((favorite) => ({ ...favorite }));
  saveCart([]);
  renderWarungs();
  renderFavorites();
  renderDetail();
  renderCart();
  renderCheckout();
  renderMenuManager();
  resetManagerForm();
  updateFavoriteTagVisibility();
  showToast('Data bawaan berhasil dipulihkan');
}

function renderDetail() {
  const target = document.getElementById('detailContent');
  if (!target) return;
  const id = Number(new URLSearchParams(location.search).get('id'));
  const warung = warungs[id];
  if (!warung) {
    target.innerHTML = `<div class="empty-state"><h2>Warung tidak ditemukan</h2><a class="back-link" href="index.html#warung">Kembali ke daftar warung</a></div>`;
    return;
  }
  target.innerHTML = `<p class="breadcrumb"><a href="index.html">Beranda</a> / <a href="index.html#warung">Warung</a> / ${escapeHTML(warung.name)}</p>
    <section class="detail-hero"><img src="${escapeHTML(warung.image)}" alt="${escapeHTML(warung.name)}"><div class="detail-copy"><p class="eyebrow">${escapeHTML(warung.type)} · ${escapeHTML(warung.location)}</p><h1>${escapeHTML(warung.name)}</h1><p>${escapeHTML(warung.description)}</p></div></section>
    <h2 class="detail-menu-heading">Menu dari warung ini</h2><div class="menu-list">${warung.menu.map((item, menuIndex) => `
      <article class="menu-row"><div class="menu-row-main"><img class="menu-photo" src="${escapeHTML(item.image || warung.image)}" alt="${escapeHTML(item.name)}" loading="lazy"><div><h3>${escapeHTML(item.name)}</h3><small>${escapeHTML(item.category)}</small></div></div><div class="menu-row-right"><strong>${rupiah(item.price)}</strong>
      <div class="add-order-control"><input class="quantity-input" type="number" min="1" max="99" step="1" value="1" aria-label="Jumlah ${escapeHTML(item.name)}">
      <button type="button" class="add-button" data-add-item="${id}-${menuIndex}">Tambah +</button></div></div></article>`).join('')}</div>`;
}

function cartTotal(cart = getCart()) { return cart.reduce((total, item) => total + item.price * item.quantity, 0); }
function renderCart() {
  const target = document.getElementById('cartContent');
  if (!target) return;
  const cart = getCart();
  if (!cart.length) {
    target.innerHTML = `<div class="empty-state"><h2>Keranjangmu masih kosong</h2><p>Yuk, pilih makanan dari warung favoritmu.</p><a class="button button-brown" href="index.html#warung">Jelajahi warung</a></div>`;
    return;
  }
  target.innerHTML = `<div class="cart-layout"><section class="cart-items" aria-label="Daftar belanja">${cart.map((item) => `
    <article class="cart-item"><div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.warung)} · ${rupiah(item.price)} / item</p></div>
    <div class="cart-item-side"><div class="quantity-control" aria-label="Atur jumlah ${escapeHTML(item.name)}">
      <button type="button" data-quantity="-1" data-id="${escapeHTML(item.id)}" aria-label="Kurangi ${escapeHTML(item.name)}">−</button><span>${item.quantity}</span>
      <button type="button" data-quantity="1" data-id="${escapeHTML(item.id)}" aria-label="Tambah ${escapeHTML(item.name)}">+</button></div>
      <strong class="item-price">${rupiah(item.price * item.quantity)}</strong><button class="remove-button" type="button" data-remove="${escapeHTML(item.id)}">Hapus</button></div></article>`).join('')}</section>
    <aside class="summary-box"><h2>Ringkasan</h2><div class="summary-line"><span>${cart.reduce((sum, item) => sum + item.quantity, 0)} item</span><span>${rupiah(cartTotal(cart))}</span></div>
      <div class="summary-line summary-total"><span>Total belanja</span><span>${rupiah(cartTotal(cart))}</span></div>
      <a class="button button-brown full-button" href="checkout.html">Lanjut ke pembayaran <span aria-hidden="true">→</span></a>
      <button class="clear-button" type="button" data-clear-cart style="margin-top:16px">Kosongkan keranjang</button></aside></div>`;
}

function renderCheckout() {
  const target = document.getElementById('checkoutContent');
  if (!target) return;
  const cart = getCart();
  if (!cart.length) {
    target.innerHTML = `<div class="empty-state"><h2>Belum ada pesanan</h2><p>Isi keranjang terlebih dahulu sebelum membayar.</p><a class="button button-brown" href="index.html#warung">Pilih menu</a></div>`;
    return;
  }
  target.innerHTML = `<div class="checkout-layout"><section class="order-box"><h2>Ringkasan pesanan</h2>${cart.map((item) => `
    <div class="order-item"><div><h3>${escapeHTML(item.name)} × ${item.quantity}</h3><p>${escapeHTML(item.warung)}</p></div><strong>${rupiah(item.price * item.quantity)}</strong></div>`).join('')}
    <div class="summary-line summary-total"><span>Total pembayaran</span><span>${rupiah(cartTotal(cart))}</span></div></section>
    <section class="payment-box"><h2>Metode pembayaran</h2><div class="payment-methods">
      <label class="payment-choice"><input type="radio" name="payment" value="qris" checked> QRIS</label>
      <label class="payment-choice"><input type="radio" name="payment" value="bank"> Transfer bank</label>
      <label class="payment-choice"><input type="radio" name="payment" value="ewallet"> E-wallet</label></div>
      <div id="paymentDetail" class="payment-detail"></div><div id="qrWrap" class="qr-wrap"><img id="qrisImage" alt="QR kode demo Pujas Food Court"><p>QR ini hanya contoh tampilan dan tidak dapat digunakan untuk membayar.</p></div>
      <div class="summary-line summary-total"><span>Total</span><span>${rupiah(cartTotal(cart))}</span></div><button class="button button-brown full-button" type="button" data-confirm-payment>Konfirmasi pesanan</button>
      <p class="notice">Pembayaran pada situs demo ini tidak diproses. Pesanan hanya simulasi.</p></section></div>`;
  updatePaymentView();
}

function updatePaymentView() {
  const method = document.querySelector('input[name="payment"]:checked')?.value;
  const detail = document.getElementById('paymentDetail');
  const qrWrap = document.getElementById('qrWrap');
  if (!detail) return;
  const copy = {
    qris: 'Pindai kode QR demo untuk melihat contoh alur QRIS.',
    bank: 'Transfer bank dipilih. Detail rekening akan ditampilkan oleh penyedia pembayaran saat integrasi tersedia.',
    ewallet: 'E-wallet dipilih. Anda akan diarahkan ke aplikasi penyedia saat integrasi pembayaran tersedia.'
  };
  detail.textContent = copy[method] || copy.qris;
  if (qrWrap) qrWrap.classList.toggle('visible', method === 'qris');
  const qr = document.getElementById('qrisImage');
  if (qr && method === 'qris' && !qr.src) {
    const data = encodeURIComponent(`PUJAS DEMO ${cartTotal()} ${Date.now()}`);
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${data}`;
  }
}

document.addEventListener('click', (event) => {
  const menuManager = document.getElementById('menuManager');
  if (event.target.closest('[data-open-menu-manager]')) {
    renderMenuManager();
    resetManagerForm();
    updateFavoriteTagVisibility();
    menuManager?.showModal();
    return;
  }
  if (event.target.closest('[data-close-menu-manager]')) {
    menuManager?.close();
    return;
  }
  if (event.target.closest('[data-reset-manager-form]')) {
    resetManagerForm();
    updateFavoriteTagVisibility();
    return;
  }
  const editMenuButton = event.target.closest('[data-edit-menu]');
  if (editMenuButton) {
    editManagerMenu(Number(editMenuButton.dataset.editMenu));
    updateFavoriteTagVisibility();
    return;
  }
  const deleteMenuButton = event.target.closest('[data-delete-menu]');
  if (deleteMenuButton) {
    deleteManagerMenu(Number(deleteMenuButton.dataset.deleteMenu));
    return;
  }
  if (event.target.closest('[data-reset-menu-data]')) {
    resetMenuData();
    return;
  }
  const addButton = event.target.closest('[data-add-item]');
  if (addButton) {
    const [warungIndex, menuIndex] = addButton.dataset.addItem.split('-').map(Number);
    const quantityInput = addButton.closest('.add-order-control')?.querySelector('.quantity-input');
    const requestedQuantity = Number(quantityInput?.value);
    const quantity = Math.min(99, Math.max(1, Math.floor(Number.isFinite(requestedQuantity) ? requestedQuantity : 1)));
    if (quantityInput) quantityInput.value = quantity;
    addToCart(getMenuItem(warungIndex, menuIndex), quantity);
    return;
  }
  const quantityButton = event.target.closest('[data-quantity]');
  if (quantityButton) {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === quantityButton.dataset.id);
    if (item) item.quantity += Number(quantityButton.dataset.quantity);
    saveCart(cart.filter((entry) => entry.quantity > 0));
    renderCart();
    return;
  }
  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    saveCart(getCart().filter((item) => item.id !== removeButton.dataset.remove));
    renderCart();
    return;
  }
  if (event.target.closest('[data-clear-cart]')) {
    saveCart([]);
    renderCart();
    return;
  }
  if (event.target.closest('[data-confirm-payment]')) {
    if (!getCart().length) return;
    saveCart([]);
    document.getElementById('checkoutContent').innerHTML = `<div class="empty-state"><h2>Pesanan berhasil dibuat!</h2><p>Terima kasih sudah memilih Pujas Food Court. Ini hanya simulasi, tidak ada pembayaran yang diproses.</p><a class="button button-brown" href="index.html">Kembali ke beranda</a></div>`;
  }
});
document.addEventListener('change', (event) => {
  if (event.target.matches('input[name="payment"]')) updatePaymentView();
  if (event.target.matches('#managerWarung')) {
    resetManagerForm();
    renderMenuManager();
  }
  if (event.target.matches('#managerFavorite')) updateFavoriteTagVisibility();
});

document.getElementById('managerMenuForm')?.addEventListener('submit', saveManagerMenu);
document.getElementById('menuManager')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

updateCartCount();
renderWarungs();
renderFavorites();
renderDetail();
renderCart();
renderCheckout();