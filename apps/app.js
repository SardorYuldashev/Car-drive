const day = document.querySelector('.day');
const night = document.querySelector('.night');
const start = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const drive = document.querySelector('.drive');
const stay = document.querySelector('.stay');
const zapravka = document.querySelector('.zapravka');
const signal = document.querySelector('.signal');
const signalAudio = document.querySelector('.body__audio');
const wrapperTop = document.querySelector('.wrapper__top');
const nur = document.querySelectorAll('.wrapper__top-nur');
const stars = document.querySelector('.wrapper__top-stars');
const disc1 = document.querySelector('.body__car-disc1');
const disc2 = document.querySelector('.body__car-disc2');
const fara = document.querySelector('.body__car-fara');
const stolbs = document.querySelector('.wrapper__top-stolbs');
const lines = document.querySelector('.wrapper__bottom-lines');
const startAudio = document.querySelector('.body__audios-start');
const driveAudio = document.querySelector('.body__audios-drive');
const bodyInfo = document.querySelector('.body__info');
const benzinInfo = document.querySelector('.body__info-benzin');
const chekInfo = document.querySelector('.body__info-chek');
const dangerInfo = document.querySelector('.body__info-danger');

class Auto {
  yoniq = false;
  yurvotti = false;
  benzin = 25;
  bak = null;


  constructor(model, brand, year, color) {
    this.model = model;
    this.brand = brand;
    this.year = year;
    this.color = color;
  }

  moshinaniYoqish() {
    if (this.benzin === 0) {
      dangerInfo.textContent = `${this.model}da yoqilg'i yo'q`;
      return
    };

    if (this.yoniq === true) {
      dangerInfo.textContent = `${this.model} yoniq`;
      return
    };

    this.yoniq = true;
    fara.style.opacity = '1';
    dangerInfo.textContent = `${this.model} yondi`;
    benzinInfo.textContent = `BENZIN: ${this.benzin}`;

    this.bak = setInterval(() => {
      this.benzin--;
      benzinInfo.textContent = `BENZIN: ${this.benzin}`;

      if (this.benzin < 6 && this.benzin !== 0) {
        chekInfo.textContent = `Bakda kam yoqilg'i qoldi`;
      };

      if (this.benzin === 0) {
        chekInfo.textContent = `Bakda yoqilg'i qolmadi`;
        clearInterval(this.bak);
      };
    }, 5000);
  };

  moshinaniYurgazish() {
    if (!this.yoniq) {
      dangerInfo.textContent = `Avval ${this.model}ni yoqing`;
      return;
    }

    if (this.yurvotti) {
      dangerInfo.textContent = `${this.model} yurib turibdi`
      return;
    }

    if (this.benzin === 0) {
      dangerInfo.textContent = `${this.model}da yoqilg'i yo'q`;
      return
    }

    this.yurvotti = true;
    dangerInfo.textContent = `${this.model} yurvotti`;


    clearInterval(this.bak);
    this.bak = setInterval(() => {
      this.benzin--;
      benzinInfo.textContent = `BENZIN: ${this.benzin}`
      if (this.benzin < 6 && this.benzin !== 0) {
        chekInfo.textContent = `Bakda kam yoqilg'i qoldi`;
      }
      if (this.benzin === 0) {
        chekInfo.textContent = `Bakda yoqilg'i qolmadi`;
        disc1.style.animationPlayState = 'paused';
        disc2.style.animationPlayState = 'paused';
        stolbs.style.animationPlayState = 'paused';
        lines.style.animationPlayState = 'paused';
        fara.style.opacity = '0';
        this.yurvotti = false;
        clearInterval(this.bak);
      }
    }, 1000);

    disc1.style.animationPlayState = 'running';
    disc2.style.animationPlayState = 'running';
    stolbs.style.animationPlayState = 'running';
    lines.style.animationPlayState = 'running';
  };

  moshinaniToxtatish() {
    if (!this.yoniq) {
      dangerInfo.textContent = `${this.model} o'chiq`;
      return;
    }

    if (this.benzin === 0) {
      dangerInfo.textContent = `${this.model}da yoqilg'i yo'q`;
      return
    }

    this.yurvotti = false;
    dangerInfo.textContent = `${this.model} to'xtadi`;
    disc1.style.animationPlayState = 'paused';
    disc2.style.animationPlayState = 'paused';
    stolbs.style.animationPlayState = 'paused';
    lines.style.animationPlayState = 'paused';
    clearInterval(this.bak);
    this.bak = setInterval(() => {
      this.benzin--;
      benzinInfo.textContent = `BENZIN: ${this.benzin}`
      if (this.benzin < 6 && this.benzin !== 0) {
        chekInfo.textContent = `Bakda kam yoqilg'i qoldi`;
      }
      if (this.benzin === 0) {
        chekInfo.textContent = `Bakda yoqilg'i qolmadi`;
        this.yurvotti = false;
        clearInterval(this.bak);
      }
    }, 5000);
  };

  moshinaniOchirish() {
    if (!this.yoniq) {
      dangerInfo.textContent = `${this.model} yoqilmagan`;
      return;
    }

    if (this.yurvotti) {
      dangerInfo.textContent = `Avval ${this.model}ni to'xtating`;
      return;
    }

    this.yoniq = false;
    fara.style.opacity = '0';
    dangerInfo.textContent = `${this.model} o'chdi`;
    clearInterval(this.bak);
  };
};

const Lamborghini = new Auto('Aventador', 'Lamborghini', 2022, 'Silver');

day.addEventListener('click', () => {
  wrapperTop.style.background = 'rgb(193, 206, 216)';
  stars.style.opacity = '0';
  bodyInfo.style.color = 'black';
  nur.forEach(item => item.style.opacity = '0');
});

night.addEventListener('click', () => {
  wrapperTop.style.background = 'rgb(3, 22, 36)';
  stars.style.opacity = '0.3';
  bodyInfo.style.color = 'white';
  nur.forEach(item => item.style.opacity = '0.8');
});

start.addEventListener('click', () => {
  Lamborghini.moshinaniYoqish();
});

drive.addEventListener('click', () => {
  Lamborghini.moshinaniYurgazish();
});

stay.addEventListener('click', () => {
  Lamborghini.moshinaniToxtatish();
});

stopBtn.addEventListener('click', () => {
  Lamborghini.moshinaniOchirish();
});

zapravka.addEventListener('click', () => {
  Lamborghini.benzin +=10;
  benzinInfo.textContent = `BENZIN: ${Lamborghini.benzin}`
  dangerInfo.textContent = `10L benzin quyildi`;
  chekInfo.textContent = ``;
});

signal.addEventListener('click', () => {
  signalAudio.play()
});