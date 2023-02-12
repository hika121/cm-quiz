'use strict';
{

  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const quizAnswer = document.getElementById('quiz-answer');

  const quizSet = shuffle([
    {
      q: '呼吸について適切なものはどれか',
      c: [
        'チェーンストーク呼吸では、小さい呼吸から徐々に大きい呼吸となり、その後徐々に小さい呼吸となって、一時的な呼吸停止を伴う呼吸状態を繰り返す。',
        '頻呼吸は、発熱や心不全ではみられない。',
        '心不全による呼吸困難は、起座位または半座位で増発し、臥位で軽減する。',
        '下顎呼吸は、慢性気管支炎や肺気腫などの慢性閉塞性肺疾患（COPD)の患者でよく見られる。',
        '高齢者は一般に、若年者と比べ、一回換気量は低下する。'
      ],
      e:'一回換気量の低下→残気量の低下。心不全は坐位で軽減・起坐位または半座位で軽減する。'
    }, {
      q: '食事について適切なものはどれか。',
      c: [
        '食事の介護のアセスメントには、福祉用具専門相談員が関わることもある。',
        '摂食・嚥下プロセスの先行期（認知期）は、食べ物を咀嚼する段階である。',
        '摂食・嚥下プロセスの咽頭期の障害では、胃からの逆流がみられる。',
        '食事の介護のアセスメントには、利用者が調理を行っているかどうかの確認は含まれない。',
        '食事の介護のアセスメントには、利用者の負担の活動性や睡眠状況も確認する。'
      ],
      e:'摂食・嚥下のプロセスは、①先行期（認知期) ②準備期 ③口腔期 ④咽頭期 ⑤食道期 がある。この時、食べ物を咀嚼する段階は②準備期である。また、胃からの逆流がみられるのは④食道期の障害である。④咽頭期の障害は、咽頭に食塊が残りやすくなることである。'
    }, {
      q: '睡眠について正しいものはどれか。',
      c: [
        '起床時の覚醒水準を高めるケアを行うことで、規則的な排泄リズムの効果が期待できる。',
        '眠りが浅く、スッキリと目覚められないことを、早期覚醒という。',
        '床についてもなかなか眠れないことを、熟眠障害という。',
        '薬の副作用によって、夜間に興奮または覚醒し、不眠になることはない。',
        'かゆみによって睡眠障害が生じることはない。'
      ],
      e:'眠りが浅く、スッキリと目覚められないことを、熟眠障害という。床についてもなかなか眠れないことを、入眠困難という。'
    },{
      q: '口腔機能や口腔ケアについて正しいものはどれか。',
      c: [
        '摂食・嚥下は、中枢神経と末梢神経により制御されている。',
        'すべての歯を喪失しても、咀嚼能力は低下しない。',
        '口腔内を清掃する際は、義歯は外さない。',
        '脱落した粘膜上皮細胞は、口臭の原因とはならない。',
      ],
      e:'すべての歯を喪失することは、咀嚼能力の低下を招き、運動能力の低下にもつながる。'
    },{
      q: '認知症について、間違っているものはどれか。',
      c: [
        '若年性認知症コーディネーターは、すべての市町村に配属されている。',
        '向精神薬が過剰だと、意欲や自発性などの低下（アバシー）をきたす場合がある。',
        '認知症の評価として、Mini-Mental State Examination (MMSE)が用いられている。',
        'レビー小体が他認知症では幻視がみられる。',
        '認知症の評価として、長谷川式認知症スケールが用いられている。'
      ],
      e:'市町村→都道府県。'
    },{
      q: '次の記述のうち、間違っているものはどれか。',
      c: [
        '心筋梗塞は、冠動脈が破裂して起こる疾患である。',
        '糖尿病は、膵臓で作られるインスリンの不足によるものである。',
        '高次脳機能障害の主な症状には、失行や失認が含まれる。',
        'フレイルとは、健康な状態と介護を要する状態の中間的な状態である。',
        '高齢者に多い骨折部位には、大腿骨頸部や胸腰椎が含まれる。'
      ],
      e:'心筋梗塞は、冠動脈の動脈硬化病変の粥種（アテローム）が破綻することによりより血管を閉塞して、その結果心筋が壊死し、心臓のポンプ機能が低下する病変である。'
    // },{
    //   q: '',
    //   c: [
    //     '',
    //     '',
    //     '',
    //     '',
    //     ''
    //   ],
    //   e:''
    }
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr;
  }

  function checkAnswer(li){
    if(isAnswered === true){
      return;
    }
    isAnswered = true;
  
    if(li.textContent === quizSet[currentNum].c[0]){
    li.classList.add('correct');
    score++;
    }else{
    li.classList.add('wrong');
   }

   btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click',() => {
        quizAnswer.textContent = `解説：${quizSet[currentNum].e} `;
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizSet.length - 1){
      btn.textContent = 'Score!'
    }
  }

  setQuiz();

  btn.addEventListener('click',() => {
    if(btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    quizAnswer.textContent = '';

    if(currentNum === quizSet.length - 1){
      scoreLabel.textContent = `score: ${score} / ${quizSet.length}`
      result.classList.remove('hidden');
    }else{
      currentNum++;
      setQuiz();
    }
  });


}