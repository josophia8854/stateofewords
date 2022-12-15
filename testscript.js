let questionNum = 0;
let result = 0;

const testNode = document.querySelector('.test');
const titleNode = document.querySelector('.title');
const questionNode = document.querySelector('.question');
const resultNode = document.querySelector('.result');
const resultWrapNode = resultNode.querySelector('.result__wrap');
const sharesNode = resultNode.querySelector('.share');
// const fbShareNode = sharesNode.querySelector('.facebook');
// const twShareNode = sharesNode.querySelector('.twitter');
// const vkShareNode = sharesNode.querySelector('.vkontakte');

const resultTexts = {
  low: '오, 공부 안했구나.',
  middle: '오, 맞추긴 하네.',
  high: '오, 이걸 맞춰...? 대단하네.',
}

const resultShareImages = [
]

const questions = [
  {
    text: '팔만대장경의 경판 숫자는 모두 몇 개인가?',
    answers: [
      {
        text: '81352',
        isCorrect: true,
      },
      {
        text: '81353',
        isCorrect: false,
      },
      {
        text: '81354',
        isCorrect: false,
      },
      {
        text: '81355',
        isCorrect: false,
      },
      {
        text: '81356',
        isCorrect: false,
      }
    ]
  },
  {
    text: '교장선생님과 잘 어울릴 것 같은 사람은?',
    answers: [
      {
        text: '전지현',
        isCorrect: false,
      },
      {
        text: '송혜교',
        isCorrect: false,
      },
      {
        text: '김태희',
        isCorrect: true,
      },
      {
        text: '이영애',
        isCorrect: false,
      },
      {
        text: '김희선',
        isCorrect: false,
      }
    ],
  },
  {
    text: '아버지께서 용돈을 주시면 감사의 인사로 가장 알맞은 것은?',
    answers: [
      {
        text: '인간적으로 너무 적습니다.',
        isCorrect: false,
      },
      {
        text: '요즘 물가 많이 올랐어요.',
        isCorrect: false,
      },
      {
        text: '이 정도 용돈 어림도 없어요.',
        isCorrect: false,
      },
      {
        text: '덕분에 플렉스하게 생겼네요.',
        isCorrect: true,
      },
      {
        text: '감사합니다. 성실하게 살겠습니다.',
        isCorrect: false,
      }
    ],
  },
  {
    text: '전쟁이 일어날 시 세상에서 제일 불쌍한 사람은?',
    answers: [
      {
        text: '이 날이 결혼식인 사람',
        isCorrect: false,
      },
      {
        text: '로또 1등 당첨된 사람',
        isCorrect: false,
      },
      {
        text: '현역군인',
        isCorrect: false,
      },
      {
        text: '8년차 고시생',
        isCorrect: false,
      },
      {
        text: '국회의원',
        isCorrect: false,
      }
    ],
  },  
  {
    text: '수은이 원인이 되어 발생한 수질오염질환은?',
    answers: [
      {
        text: '이타이이타이병',
        isCorrect: false,
      },
      {
        text: '미나마타병',
        isCorrect: true,
      },
      {
        text: '쯔쯔가무시병',
        isCorrect: false,
      },
      {
        text: '가네이병',
        isCorrect: false,
      },
      {
        text: '니코짱카와이병',
        isCorrect: false,
      }
    ]
  },
  {
    text: '선생님이 쌀국수를 먹은 날은?',
    answers: [
      {
        text: '12월 13일',
        isCorrect: true,
      },
      {
        text: '12월 14일',
        isCorrect: false,
      },
      {
        text: '12월 15일',
        isCorrect: false,
      },
      {
        text: '12월 16일',
        isCorrect: false,
      },
      {
        text: '12월 17일',
        isCorrect: false,
      },
    ],
  }
];

const pad = (n, width, z) => {
  z = z || '0';
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const enableQuestions = () => {
  document.querySelector('.test__category_active').classList.remove('test__category_active');
  questionNode.classList.add('test__category_active');
}

const enableResults = () => {
  document.querySelector('.test__category_active').classList.remove('test__category_active');
  resultNode.classList.add('test__category_active');
}

const startTest = () => {
  enableQuestions();  
  questionNum = result = 0;
  showQuestion(questionNum);
}

const handleAnswer = (correct) => {
  questionNum++;
  
  if(correct === 'true') {
    result++;
  }
  
  if(questionNum < questions.length) {
    showQuestion(questionNum);
  } else {
    enableResults();
    showResult();
  }
}

testNode.addEventListener('click', e => {
  const classList = e.target.classList;
  
  switch(true) {
    case (classList.contains('test__start')):
      startTest();
      break;
    case (classList.contains('question__answer')):
      handleAnswer(e.target.dataset.correct);
      break;
    default:
      break;
  }
})

const showQuestion = (num) => {
  questionNode.innerHTML = renderQuestion(questions[num], num);
}

const renderQuestion = ({text, answers}, num) => (
  `
    <div class='question__wrap'>
      <div class='question__num'>${pad(num + 1, 2, 0)}.</div>
      <div class='question__text'>${text}</div>
      <div class='question__answers'>${renderAnswers(answers)}</div>
    </div>
  `
)

const renderAnswers = (answers) => {
  let result = '';
  answers.map(({text, isCorrect}) => result += renderAnswer(text, isCorrect))
  return result;
}

const renderAnswer = (text, isCorrect) => `<div data-correct='${isCorrect}' class='question__answer'>${text}</div>`;

const showResult = () => resultWrapNode.innerHTML = renderResult();

const renderResult = () => {
  const percent = Math.round(result * 100 / questions.length);
  let comment = '';
  
  switch(true) {
    case (percent <= 40):
      comment = resultTexts.low;
      break;
    case (percent <= 70):
      comment = resultTexts.middle;
      break;
    default: 
      comment = resultTexts.high; 
      break;
  }
  
  // vkShareNode.dataset.image = resultShareImages[result];
  
  return `
    <div class='result__grade'>${result}/${questions.length}</div>
    <div class='result__comment'>${comment}</div>
    ${percent > 70 ? renderStickers() : `<div class='test__start'>다시보기</div>`}
  `;
}