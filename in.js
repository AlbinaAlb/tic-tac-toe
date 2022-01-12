let game = document.querySelector('.game');
let res = document.querySelector(".res");
let btnGame = document.querySelector(".new-game");
let fields = document.querySelectorAll(".field");
//для определения чей ход х или 0
let step = false;
let count = 0;
//нолик
let circle = `<svg class="circle">
        <circle r='45' cx='58' cy='58' stroke='blue' stroke-width='10' fill='none'
         stroke-linecap='round' />
    </svg>`;
    //крестик
let cross = `<svg class="cross">
        <line class="first" x1='15' y1='15' x2='100' y2='100' stroke='red' stroke-width='10'
        stroke-linecap='round' />
        <line class="second" x1='100' y1='15' x2='15' y2='100' stroke='red' stroke-width='10' 
        stroke-linecap='round' />
      </svg>`;

        //в этой фукции будет инициализироваться крестик
      function stepCross(target) {
        //если кликнули по svg или circle или line, то выходим из функции (чтоб нельзя было нажать на клетку дважды)
        if (
          target.tagName == "svg" ||
          target.tagName == "line" ||
          target.tagName == "circle"
        ) {
          return;
        }
        target.innerHTML = cross;
        //добавить класс после того как ячейка кликнута
        target.classList.add("x");
        //добавляем звук
        let crossAudio = new Audio("audio/cross.mp3");
        crossAudio.play();
        count++;
        step = true;
      }
        //в этой фукции будет инициализироваться нолик

      function stepZero(target) {
              if (
                target.tagName == "svg" ||
                target.tagName == "line" ||
                target.tagName == "circle"
              ) {
                return;
              }
        target.innerHTML = circle;
        target.classList.add("o");
        //добавляем звук
        let circleAudio = new Audio("audio/zero.mp3");
        circleAudio.play();
        count++;
        step = false;
      }
      //инициализация самой игры
      function init (e) {
        //чтоб узнать чей ход: если шаг тру то вызывается функция шагКрестик(target – элемент, на котором произошло событие)
        if (!step) stepCross(e.target);
        else stepZero(e.target);
        //для проверки победителя
        win();
      }
      //для кнопки нова игра
      function newGame() {
        step = false;
        count = 0;
        res.innerText = '';
        //удаляем все присвоенные классы
        fields.forEach(item=>{
                item.innerHTML = '';
                item.classList.remove('x', 'o', 'active')
        });
        //чтоб можно было играть заново
        game.addEventListener('click', init)
      }
      //для определения победителя
      function win(){
        //массив выигрышных комбинаций
        let comb = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
        ];
        //цикл который пробегает по всем выигрышным комбинациям
        for (let i = 0; i < comb.length; i++) {
                //если в ячейках содержится класс х (который задается когда на ячейку кликнули)
                if(fields[comb[i][0]].classList.contains('x') &&
                fields[comb[i][1]].classList.contains('x') &&
                fields[comb[i][2]].classList.contains('x')) {
                        //тогда если они совпали добавляется класс active (спустя 1,5 сек)
                        setTimeout(()=>{
                                fields[comb[i][0]].classList.add('active');
                                fields[comb[i][1]].classList.add('active');
                                fields[comb[i][2]].classList.add('active');
                                res.innerText = 'Выиграл Х'
                        }, 1500);
                        //удаляем клик, чтоб при выиграше нельзя было продолжит игру
                        game.removeEventListener('click', init);
                }

               else if (
                  fields[comb[i][0]].classList.contains("o") &&
                  fields[comb[i][1]].classList.contains("o") &&
                  fields[comb[i][2]].classList.contains("o")
                ) {
                  //тогда если они совпали добавляется класс active (спустя 1,5 сек)
                  setTimeout(() => {
                    fields[comb[i][0]].classList.add("active");
                    fields[comb[i][1]].classList.add("active");
                    fields[comb[i][2]].classList.add("active");
                    res.innerText = "Выиграл 0";
                  }, 1500);
                  //удаляем клик, чтоб при выиграше нельзя было продолжит игру
                  game.removeEventListener("click", init);
                }
                //если не сработали оба условия - если все 9 клеток заполнены, но нет выигрышной комбинации
                else if(count == 9){
                        res.innerText = "Ничья";
                        game.removeEventListener('click', init);
                }
        }
      }


       btnGame.addEventListener("click", newGame); //для кнопки новая игра
      game.addEventListener("click", init); //для клика по полю игры