$("#info-container").hide();

// CHECK INPUT VALUE ON CHANGE //
$(".inputan").change(function () {
  checkFormIsNotEmpty();
});

// FORM SUBMIT //
$("#form-supply").submit((e) => {
  e.preventDefault();
  let data = convertSerializeArrayToObject($("#form-supply").serializeArray());

  data = checkDiscount(data);
  printMessege(data);
});

// CLEAR FORM //
$("#clear-button").click(() => {
  $("#form-supply").trigger("reset");
  $("#info-container").hide();
});

// FUNCTION //
function checkFormIsNotEmpty() {
  let filled = false;
  let checked = $('input[name="tipe"]:checked').val() !== "";

  // Check Input Form
  $(".inputan").each(function () {
    filled = false;

    if ($(this).val() == "") return false;
    else filled = true;
  });

  if (filled && checked) $("#submit-button").attr("disabled", false);
  else $("#submit-button").attr("disabled", true);
}

function checkDiscount(data) {
  const totalHarga = data.harga * data.jumlah;
  if (totalHarga > 1000000) {
    const discountPrice = totalHarga - (totalHarga * 10) / 100;
    return { ...data, discount: discountPrice };
  }

  return { ...data, discount: null };
}

function convertSerializeArrayToObject(arr) {
  let obj = {};
  arr.forEach((data) => {
    obj = { ...obj, [data.name]: data.value };
  });

  return obj;
}

function printMessege(data) {
  let messege = `${data.barang} berhasil ditambahkan ker rak ${
    data.tipe
  } sebanyak ${data.jumlah} pcs dari ${data.supplier}.<br />
  Harga per pcs ${data.harga}, total ${data.harga * data.jumlah}.`;
  const discountMessege = `<br /> Diskon 10% menjadi ${data.discount}.`;

  messege += data.discount ? discountMessege : "";

  $(".info").html(messege);
  $("#info-container").show();

  $("html, body").animate(
    {
      scrollTop: $(".info").offset().top,
    },
    100
  );
}
