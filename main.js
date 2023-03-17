
//入力モードの定義と初期値設定(不正入力の制御に使用)
let initial_mode           = true;  // 初期状態を表す（ディスプレイが0）
let afterPoint_mode        = false; // 小数点以下入力状態
let noOperator_mode        = false; // 演算子の入力禁止状態
let noOperatorAfter0x_mode = false; // 演算子後の0x入力禁止状態 


// JQuery
$(document).ready(function() {
  
  // 関数
  // 押下したボタンの文字列をディスプレイに更新・追記する
  
  // 1から9のボタン押下時
  function addNumber1to9(buttonNum) {
    const myNum = $(buttonNum).text();
    
    const nowDisplayText = $("#display").text();
    const lastCha = nowDisplayText.slice(-1);
    
    if ( nowDisplayText.length >= 24 ) { // ディスプレイ24文字入力制限
      return;
    } else if ( noOperatorAfter0x_mode === true && lastCha === "0" ) {
      return;
    } else if ( initial_mode === true ) {
      $("#display").text(myNum);
    } else {
      $("#display").append(myNum);
    }
    
    if ( initial_mode === true ) {
      initial_mode = false;
    }
    
    if ( noOperator_mode === true ) {
      noOperator_mode = false;
    }
    
    if ( noOperatorAfter0x_mode === true ) {
      noOperatorAfter0x_mode = false;
    }
  }
  
  
  // 0のボタン押下時
  function addNumberZero(buttonNum) {
    const myNum = $(buttonNum).text();
    
    const nowDisplayText = $("#display").text();
    const lastCha = nowDisplayText.slice(-1);
    
    if ( nowDisplayText.length >= 24 ) {
      return;
    } else if ( nowDisplayText === "Infinity" ) { // 計算結果が無限（Infinity）の場合の制御
      $("#display").text("0");
    } else if ( afterPoint_mode === true ) {
      $("#display").append(myNum);
    } else if ( initial_mode === true ) {
      return;
    } else if ( noOperatorAfter0x_mode === true && lastCha === "0" ) {
      return;
    } else {
      $("#display").append(myNum);
    }
    
    if ( noOperator_mode === true ) {
      noOperator_mode = false;
    }
  }
  
  
  // 00のボタン押下時
  function addNumberZeroZero(buttonNum) {
    const myNum = $(buttonNum).text();
    
    const nowDisplayText = $("#display").text();
    const lastCha = nowDisplayText.slice(-1);
    
    if ( nowDisplayText.length >= 24 ) {
      return;
    } else if ( afterPoint_mode === true ) {
      $("#display").append(myNum);
    } else if ( initial_mode === true ) {
      return;
    } else if ( noOperator_mode === true ) {
      return;
    } else if ( noOperatorAfter0x_mode === true && lastCha === "0" ) {
      return;
    } else {
      $("#display").append(myNum);
    }
    
    if ( noOperator_mode === true ) {
      noOperator_mode = false;
    }
  }
  
  
  // ピリオドのボタン押下時
  function addPeriod(buttonCha) {
    const myCha = $(buttonCha).text();
    const nowDisplayText = $("#display").text();
    
    if ( nowDisplayText.length >= 24 ) {
      return;
    } else if ( nowDisplayText === "Infinity" ) {
      return;
    } else if ( noOperator_mode === true ) {
      return;
    } else if ( afterPoint_mode === true ) {
      return;
    } else {
      $("#display").append(myCha);
    }
    
    afterPoint_mode = true;
    
    if ( initial_mode === true ) {
      initial_mode = false;
    }
  }
  
  
  // 演算子のボタン押下時
  function addOperator(buttonCha) {
    const myCha = $(buttonCha).text();
    
    const nowDisplayText = $("#display").text();
    const lastCha = nowDisplayText.slice(-1);
    
    if ( nowDisplayText.length >= 24 ) {
      return;
    } else if ( nowDisplayText === "Infinity" ) {
      return;
    } else if ( noOperator_mode === true ) {
      return;
    } else if ( lastCha === "." ) {
      return;
    } else {
      $("#display").append(myCha);
    }
    
    noOperator_mode        = true;
    noOperatorAfter0x_mode = true;
    if ( afterPoint_mode === true ) {
      afterPoint_mode = false;
    }
  }
  
  
  
  // 各ボタン押下時のイベント動作
  // 数字
  $("#button-One").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Two").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Three").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Four").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Five").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Six").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Seven").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Eight").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Nine").click(function() {
    addNumber1to9(this);
  });
  
  $("#button-Zero").click(function() {
    addNumberZero(this);
  });
  
  $("#button-ZeroZero").click(function() {
    addNumberZeroZero(this);
  });
  
  
  //小数点
  $("#button-Period").click(function() {
    addPeriod(this);
  });
  
  
  //演算子
  $("#button-Add").click(function() {
    addOperator(this);
  });
  
  $("#button-Sub").click(function() {
    addOperator(this);
  });
  
  $("#button-Mul").click(function() {
    addOperator(this);
  });
  
  $("#button-Div").click(function() {
    addOperator(this);
  });
  
  
  // クリア
  $("#button-AllClear").click(function() {
    $("#display").text("0");
    
    initial_mode           = true;
    afterPoint_mode        = false;
    noOperator_mode        = false;
    noOperatorAfter0x_mode = false;
  });
  
  
  // 計算と結果表示
  $("#button-Result").click(function() {
    const nowDisplayText = $("#display").text();
    const lastCha = nowDisplayText.slice(-1);
    let ResultNum;
    let ResultDisplay;
    
    if ( noOperator_mode === true ) {
      return;
    } else if ( lastCha === "." ) {
      return;
    } else {
      ResultNum = new Function("return " + nowDisplayText);
      $("#display").text(ResultNum);
      
      ResultDisplay = $("#display").text();
    }
    
    if ( ResultDisplay === "0" ) {
      initial_mode = true;
    }
      
    if ( ResultDisplay.indexOf(".") !== -1 ) {
      afterPoint_mode = true;
    }
    
    if ( ResultDisplay === "Infinity" ) {
      initial_mode = true;
    }
  });
  
});

