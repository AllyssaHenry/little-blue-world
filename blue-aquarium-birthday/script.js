/* =========================================
   LITTLE BLUE WORLD 💙
   Birthday Aquarium — Interactive Memories
   ========================================= */

const SECRET_MESSAGES = {
  jelly: {
    title: "For My Favourite Human 🪼",
    message: "abiy, i hope you know that you don't have to have everything figured out right now. we're both still learning and trying to build our own future, and that's okay. just keep going at your own pace, okay? i'm proud of you for the things you do, even the little things you might think nobody notices. i hope life treats you kindly, and whenever things get tough, i hope you remember that there's someone here who's always rooting for you. 🤍"
  },
  pearl: {
    title: "The Little Things I Love 🐚",
    message: "i think one of my favourite things about us is how the little things end up meaning so much to me. the random conversations, the time we spend together, the silly things we laugh about and even the moments that seem ordinary at first. i don't need every moment to be something big or fancy. sometimes just being with you is enough. that's the kind of happiness i want more of with you, baby. 🩵"
  },
  chest: {
    title: "A Future We're Building 🗝️",
    message: "if someone asked me what i look forward to the most, i think it's all the little things we still haven't experienced together. more dates, more adventures, supporting each other through our studies and careers, and slowly working towards the future we always talk about. i know there's still a lot for us to learn and achieve, but i'm happy that we're taking things one step at a time. no need for a perfect love story, just two people who genuinely want to make things work. insyaAllah, one day at a time, abiy. 🤍"
  }
};

const FISH_MEMORIES = {
  fish: {
    photo: "photos/us-01.jpg",
    title: "Our First Little Keepsake 🩵",
    caption: "Our first photobooth together 🥹🤍 it's such a small thing but somehow this picture means a lot to me. one of those little memories that i know i'll look back at and smile. and to think this was only our second date hehe. look at us now, collecting more memories together. i hope we get to take so many more pictures like this, until we're old and still annoying each other HAHAHA."
  },
  fish2: {
    photo: "photos/us-02.jpg",
    title: "Our Little Baby Step 🤍",
    caption: "from going on dates to attending kursus kahwin together 🥹🤍 it's kinda crazy when i think about it. we're slowly taking little steps towards something bigger, and i'm happy i get to experience these things with you. one step at a time, no need to rush anything. we'll work towards our dreams, settle our responsibilities and hopefully one day look back at this picture from our own little home. insyaAllah, baby. 🤍"
  }
};

const discovered = new Set();
const TOTAL_DISCOVERIES = 5;

const popup = document.getElementById("memory-popup");
const photo = document.getElementById("couple-photo");
const title = document.getElementById("memory-title");
const caption = document.getElementById("memory-caption");
const closeButton = document.getElementById("close-popup");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2400);
}

function updateProgress() {
  const count = Math.min(discovered.size, TOTAL_DISCOVERIES);
  const text = document.getElementById("progress-text");
  const fill = document.getElementById("progress-fill");
  const bar = document.getElementById("progress-bar");

  if (text) text.textContent = `${count} / ${TOTAL_DISCOVERIES} discoveries`;
  if (fill) fill.style.width = `${(count / TOTAL_DISCOVERIES) * 100}%`;
  if (bar) bar.setAttribute("aria-valuenow", String(count));

  if (count === TOTAL_DISCOVERIES && !discovered.has("final")) {
    discovered.add("final");
    setTimeout(showFinalBirthdayMessage, 10000);
  }
}

function openPopup({ heading, message, image = null }) {
  if (!popup) return;

  title.textContent = heading;
  caption.textContent = message;

  if (image) {
    photo.style.display = "block";
    photo.alt = heading;
    photo.onerror = () => {
      photo.style.display = "none";
      showToast("Photo not found — check the filename in your photos folder.");
    };
    photo.src = image;
  } else {
    photo.removeAttribute("src");
    photo.style.display = "none";
  }

  popup.classList.add("active");
  popup.setAttribute("aria-hidden", "false");
  document.body.classList.add("popup-open");
}

function closePopup() {
  if (!popup) return;
  popup.classList.remove("active");
  popup.setAttribute("aria-hidden", "true");
  document.body.classList.remove("popup-open");
}

if (closeButton) closeButton.addEventListener("click", closePopup);

if (popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePopup();
});

function animateFood(fish) {
  const aquarium = document.getElementById("aquarium");
  if (!aquarium) return;

  const food = document.createElement("span");
  food.className = "fish-food";
  food.textContent = "✦";

  const fishRect = fish.getBoundingClientRect();
  const tankRect = aquarium.getBoundingClientRect();
  food.style.left = `${fishRect.left - tankRect.left + fishRect.width / 2}px`;
  food.style.top = `${fishRect.top - tankRect.top - 8}px`;

  aquarium.appendChild(food);
  setTimeout(() => food.remove(), 900);
}

function feedFish(fish, id) {
  const memory = FISH_MEMORIES[id];
  if (!memory || fish.classList.contains("eating")) return;

  animateFood(fish);
  fish.classList.add("eating");
  showToast("Nom nom! Your fish found a memory 🐟");

  setTimeout(() => {
    fish.classList.remove("eating");

    if (!discovered.has(id)) {
      discovered.add(id);
      updateProgress();
    }

    openPopup({
      heading: memory.title,
      message: memory.caption,
      image: memory.photo
    });
  }, 420);
}

function openTextSecret(id) {
  const memory = SECRET_MESSAGES[id];
  if (!memory) return;

  if (!discovered.has(id)) {
    discovered.add(id);
    updateProgress();
  }

  openPopup({ heading: memory.title, message: memory.message });
}

function showFinalBirthdayMessage() {
  openPopup({
    heading: "One More Thing, Baby 🎂",
    message:
"happy 22nd birthday, abiy 🤍 i made this little world just for you, filled with some of the memories we've made and a few words i don't always know how to say properly. i know it's just a small thing, but i wanted to make something that's ours, something you can look through and remember the little moments we've shared. we're still at the beginning of so many things, and there's so much more waiting for us. i hope this year brings you closer to your dreams, gives you more reasons to smile and makes you proud of the person you're becoming. thank you for being part of my life and for giving me memories that i'll always keep close to my heart. here's to more firsts, more dates, more random pictures and hopefully one day, more memories in the home we'll build for ourselves, insyaAllah. happy birthday, baby. enjoy being 22, and don't forget to take care of yourself. i'm always rooting for you. 🤍"  });
}

document.querySelectorAll(".fish[data-secret]").forEach((fish) => {
  fish.addEventListener("click", () => feedFish(fish, fish.dataset.secret));
});

document.querySelectorAll(".jelly[data-secret], .sea-object[data-secret]").forEach((object) => {
  object.addEventListener("click", () => openTextSecret(object.dataset.secret));
});

updateProgress();


const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");

if (bgMusic && musicToggle && musicLabel) {
  bgMusic.volume = 0.35;

  musicToggle.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicLabel.textContent = "Pause our song";
        musicToggle.setAttribute("aria-label", "Pause background music");
      } catch (error) {
        musicLabel.textContent = "Tap to try again";
      }
    } else {
      bgMusic.pause();
      musicLabel.textContent = "Play our song";
      musicToggle.setAttribute("aria-label", "Play background music");
    }
  });

  bgMusic.addEventListener("ended", () => {
    musicLabel.textContent = "Play our song";
  });
}