import gItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

function renderGalleryMarkup() {
  //refs.gallery.innerHTML = makeGalleryMarkup(gItems);
  refs.gallery.insertAdjacentHTML("beforeend", makeGalleryMarkup(gItems));
}

function makeGalleryMarkup(images) {
  return images
    .map(
      ({ preview, description, original }) =>
        `<li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"/>
          </a>
        </li>`
    )
    .join("");
}

function openModalWindow(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  refs.lightboxImage.src = e.target.dataset.source;
  refs.lightbox.classList.toggle("is-open");
  document.addEventListener("keydown", closeModalWindowEscapeKey);
}

function closeModalWindow(e) {
  refs.lightboxImage.src = "";
  refs.lightbox.classList.remove("is-open");
}

function closeModalWindowEscapeKey(e) {
  if (e.keyCode == 27) {
    closeModalWindow("Escape");
  }

  document.removeEventListener("keydown", closeModalWindowEscapeKey);
}

renderGalleryMarkup();

refs.gallery.addEventListener("click", openModalWindow);
refs.lightboxOverlay.addEventListener("click", closeModalWindow);
refs.lightboxBtn.addEventListener("click", closeModalWindow);
