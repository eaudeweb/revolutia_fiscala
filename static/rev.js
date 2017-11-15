$(document).ready(function(){
var toImage = document.querySelector('.q1.question')

domtoimage.toPng(toImage)
  .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
  })
  .catch(function (error) {
      console.error('oops, something went wrong!', error);
  });


  // $('input:radio').on('change',function(){
  // 	console.log($(this))
  //   if ($(this).is(':checked')) {
  //   	var target = $(this).attr('target');
  //   	$('.'+target).css('display', 'block')
  //   	$('.'+target +' .question:not(.hidden)').css('display', 'block')
  //   }
  // });


  // $('.q2_4').click(function(){
  //   if ($(this).is(':checked')) {
  //   	var target = $(this).attr('target');
  //   	$('.'+target).css('display', 'block')
  //   }
  // });



  // $('button').click(function(){
  //   	var target = $(this).attr('target');
  //   	console.log(target)
  //   	$('.'+target).css('display', 'block')
  // });

  function este_fara_impozit(net){
    complet = net * 1.473053892;
    return complet * 0.6356968215;
  }

  // function trebuia_fara_impozit(net){
  //   brut = net / 0.835 * 1.25;
  //   return brut * 0.835;
  // }
  function trebuia(net){
    return net * 1.25;
  }

  function este_cu_impozit(net){
    complet = net * 1.753635586;
    return complet * 0.5721271394;
  }

  // function trebuia_cu_impozit(net){
  //   brut = net / 0.7014 * 1.25;
  //   console.log("brut " + brut);
  //   return brut * 0.585;
  // }

  function procentaj_pierdere(trebuia, este, net){
    return ((trebuia - este) * 100) / (trebuia - net);
  }

  function contrib_procentaj_pierdere(este, net){
    return 100 - 100*este/net;
  }

  function fara_contrib_fara_impozit(net){
    brut = net / 0.835;
    console.log("brut " + brut);
    return brut * 0.65;
  }

  function fara_contrib_cu_impozit(net){
    brut = net / 0.7014;
    return brut * 0.585;
  }

  function isInArray(myArray, value) {
    for (let index = 0; index < myArray.length-1; index++) {
      const element = myArray[index];
      if(element.value === value) {
        return true;
      }
    }
    return false;
  }

  var ViewModel = function() {
    this.angajat = ko.observable();
    this.bugetarAngajat = ko.observable(false);
    this.bugetarAngajator = ko.observable(false);
    this.transfer = ko.observable(false);
    this.salariu = ko.observable();
    this.salariuCalculat = ko.observable();
    this.reducere = ko.observable();
    this.angajatiScutiti = ko.observable(false);
    this.sumaTotalaScutiti = ko.observable();
    this.sumaTotalaScutitiCalc = ko.observable();
    this.domeniuSelected = ko.observable();
    this.showAnsw = ko.observable(false);
    this.trebuie = ko.observable();
    this.procent = ko.observable();
    this.diferenta = ko.observable();
    this.contrib = ko.observable();
    this.button1Visible = ko.observable(false);
    this.result = ko.observable({net: null, trebuie: null, este: null, procent: null, contrib: null, diferenta: null});

    this.domeniu = [
      {text: 'Lucrez in IT', value: "it"},
      {text: 'Lucrez in cercetare și dezvoltare', value: "cercetare"},
      {text: 'Lucrez in industria HoReCa (hoteluri, restaurante, cafenele)', value: "horeca"},
      {text: 'Beneficiez de reducerea impozitului din cauza unui handicap', value: "handicap"},
      {text: 'Niciuna din cele de mai sus', value: "niciuna"}
    ]

    this.calcSalariu = function calcSalariu() {
      var result = {net: null, trebuie: null, este: null, procent: null, contrib: null, diferenta: null};
      result.net = parseInt(this.salariu());

      if(this.bugetarAngajat() === 'true') { // bugetar
        if(isInArray(this.domeniu, this.domeniuSelected())) { // fara impozit
          result.trebuie = trebuia(result.net).toFixed(2);
          result.este = este_fara_impozit(result.net);
          result.procent = procentaj_pierdere(result.trebuie, result.este, result.net).toFixed(2);
          $()
        } else {// cu impozit
          result.trebuie = trebuia(result.net).toFixed(2);
          result.este = este_cu_impozit(result.net);
          result.procent = procentaj_pierdere(result.trebuie, result.este, result.net).toFixed(2);
        }
        result.diferenta = result.trebuie - result.net;
      } else { // privat
        if(isInArray(this.domeniu, this.domeniuSelected())) { // fara impozit

          switch (this.transfer()) {
            case "da": // a2_1 answer
              result.este = este_fara_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              break;
            case "nu": // a2_1 answer
              result.este = fara_contrib_fara_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              break;
            case "idk": // a2_2 answer
              result.este = fara_contrib_fara_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              break;
            default:
              break;
          }
        } else { // cu impozit
          switch (this.transfer()) {
            case "da": // a2_3 answer
              result.este = este_cu_impozit(result.net);
              // xxx  este - net
              result.diferenta = (result.este - result.net).toFixed(2);
              break;
            case "nu": // a2_1 answer
              result.este = fara_contrib_cu_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              break;
            case "idk": // a2_2 answer
              result.este = fara_contrib_cu_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              break;
            default:
              break;
          }

        }
      }
      this.button1Visible(true);
      this.result(result);
      console.log('result', result)
      return result;
    };

    this.calcReducereSalariu = function calcReducereSalariu() {
      console.log('calcReducereSalariu', this)
    }

    this.reset = function reset() {
      this.button1Visible(false);
    }
  };

  ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
  };
  ko.applyBindings(new ViewModel());
})
