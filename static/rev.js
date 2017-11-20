$(document).ready(function(){


  var location;

  if (window.location.href == 'http://localhost:8080/index.html') {
    location = 'http://revolutiafiscala.edw.ro'
  }
  else {
    location = window.location.href
  }

  $('meta[property="og:url"]').attr('content', location)

  $('meta[property="og:image"]').attr('content',location+'/static/header.jpg')


  $('.despre').on('click', function(){
    $('.about.answer').addClass('open');
  })

  $('.about .close').on('click',function(){
    $(this).parent().removeClass('open')
  })

  function este_fara_impozit(net){
    complet = net * 1.473053892;
    return complet * 0.6356968215;
  }

  function trebuia(net){
    return net * 1.25;
  }

  function este_cu_impozit(net){
    complet = net * 1.753635586;
    return complet * 0.5721271394;
  }

  function procentaj_pierdere(trebuia, este, net){
    return ((trebuia - este) * 100) / (trebuia - net);
  }

  function contrib_procentaj_pierdere(este, net){
    return 100 - 100*este/net;
  }

  function fara_contrib_fara_impozit(net){
    brut = net / 0.835;
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
    this.angajat = ko.observable('true');
    this.bugetarAngajat = ko.observable();
    this.bugetarAngajator = ko.observable();
    this.transfer = ko.observable();
    this.salariu = ko.observable();
    this.salariuCalculat = ko.observable();
    this.reducere = ko.observable();
    this.angajatiScutiti = ko.observable();
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
    this.invalidForm = ko.observable(false);

    this.validForm = function validForm() {
      return (this.bugetarAngajat() !== undefined)
              && (this.salariu() !== undefined)
              && (this.domeniuSelected() !== undefined)
    }

    this.calcSalariu = function calcSalariu() {
      var result = {net: null, trebuie: null, este: null, procent: null, contrib: null, diferenta: null};
      result.net = parseInt(this.salariu());

      if(!this.validForm()) {
        this.invalidForm(true);
        this.button1Visible(true);
        return;
      } else {
        this.invalidForm(false);
        this.button1Visible(false);
      }

      this.imageUrl =  location + '/static/fb/';

      if(this.bugetarAngajat() === 'true') { // bugetar
        if(this.domeniuSelected() === 'true') { // fara impozit
          result.trebuie = trebuia(result.net).toFixed(2);
          result.este = este_fara_impozit(result.net);
          result.procent = procentaj_pierdere(result.trebuie, result.este, result.net).toFixed(2);
          this.imageUrl += 'bugetar_fara_impozit_9494200103b.png';
        } else {// cu impozit
          result.trebuie = trebuia(result.net).toFixed(2);
          result.este = este_cu_impozit(result.net);
          result.procent = procentaj_pierdere(result.trebuie, result.este, result.net).toFixed(2);
          this.imageUrl += 'bugetar_cu_impozit_1499524214a.png';
        }
        result.diferenta = result.trebuie - result.net;
      } else { // privat
        if(this.domeniuSelected() === 'true') { // fara impozit

          switch (this.transfer()) {
            case "da": // a2_1 answer
              result.este = este_fara_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              this.imageUrl += 'da_fara_impozit_6711773674d.png';
              break;
            case "nu": // a2_1 answer
              result.este = fara_contrib_fara_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              this.imageUrl += 'nu_fara_impozit_9507080543h.png';
              break;
            case "idk": // a2_2 answer
              result.este = fara_contrib_fara_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              this.imageUrl += 'idk_fara_impozit_5046536364f.png';
              break;
            default:
              break;
          }
        } else { // cu impozit
          switch (this.transfer()) {
            case "da": // a2_3 answer
              result.este = este_cu_impozit(result.net);
              // xxx  este - net
              result.contrib = -1 * contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              this.imageUrl += 'da_cu_impozit_2313258562c.png';
              break;
            case "nu": // a2_1 answer
              result.este = fara_contrib_cu_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              this.imageUrl += 'nu_cu_impozit_9841434880g.png';
              break;
            case "idk": // a2_2 answer
              result.este = fara_contrib_cu_impozit(result.net);
              // xxx net - este
              result.diferenta = (result.net - result.este).toFixed(2);
              result.contrib = contrib_procentaj_pierdere(result.este, result.net).toFixed(2); // procent
              this.imageUrl += 'idk_cu_impozit_9254782264e.png';
              break;
            default:
              break;
          }

        }
      }
      this.button1Visible(true);
      this.result(result);

      return result;
    };

    this.reset = function reset() {
      this.button1Visible(false);
    }

    this.shareImageOnFacebook = function shareImageOnFacebook() {
      window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(this.imageUrl),'sharer','toolbar=0,status=0,width=626,height=436');return false;
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
});

function generateHash(){
  var currentdate = new Date().valueOf();
  var id = generateId(20) + currentdate;

    // dec2hex :: Integer -> String
  function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }

  // generateId :: Integer -> String
  function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }

  return id
}
