if (Tables.find().count() < 1) {
  Tables.insert({
    name: 'First Table'
  });
}

if (Cards.find().count() === 0) {
  Cards.insert({ name: 'As coeur', value: 11, numero: 1, path: '', sign : "As ♥" });
  Cards.insert({ name: '2 coeur', value: 2, numero: 2, path: '', sign : "2 ♥" });
  Cards.insert({ name: '3 coeur', value: 3, numero: 3, path: '', sign : "3 ♥" });
  Cards.insert({ name: '4 coeur', value: 4, numero: 4, path: '', sign : "4 ♥" });
  Cards.insert({ name: '5 coeur', value: 5, numero: 5, path: '', sign : "5 ♥" });
  Cards.insert({ name: '6 coeur', value: 6, numero: 6, path: '', sign : "6 ♥" });
  Cards.insert({ name: '7 coeur', value: 7, numero: 7, path: '', sign : "7 ♥" });
  Cards.insert({ name: '8 coeur', value: 8, numero: 8, path: '', sign : "8 ♥" });
  Cards.insert({ name: '9 coeur', value: 9, numero: 9, path: '', sign : "9 ♥" });
  Cards.insert({ name: '10 coeur', value: 10, numero: 10, path: '', sign : "10 ♥" });
  Cards.insert({ name: 'J coeur', value: 10, numero: 11, path: '', sign : "J ♥" });
  Cards.insert({ name: 'Q coeur', value: 10, numero: 12, path: '', sign : "Q ♥" });
  Cards.insert({ name: 'K coeur', value: 10, numero: 13, path: '', sign : "K ♥" });
  Cards.insert({ name: 'As pique', value: 11, numero: 14, path: '', sign : "As ♠" });
  Cards.insert({ name: '2 pique', value: 2, numero: 15, path: '', sign : "2 ♠" });
  Cards.insert({ name: '3 pique', value: 3, numero: 16, path: '', sign : "3 ♠" });
  Cards.insert({ name: '4 pique', value: 4, numero: 17, path: '', sign : "4 ♠" });
  Cards.insert({ name: '5 pique', value: 5, numero: 18, path: '', sign : "5 ♠" });
  Cards.insert({ name: '6 pique', value: 6, numero: 19, path: '', sign : "6 ♠" });
  Cards.insert({ name: '7 pique', value: 7, numero: 20, path: '', sign : "7 ♠" });
  Cards.insert({ name: '8 pique', value: 8, numero: 21, path: '', sign : "8 ♠" });
  Cards.insert({ name: '9 pique', value: 9, numero: 22, path: '', sign : "9 ♠" });
  Cards.insert({ name: '10 pique', value: 10, numero: 23, path: '', sign : "10 ♠" });
  Cards.insert({ name: 'J pique', value: 10, numero: 24, path: '', sign : "J ♠" });
  Cards.insert({ name: 'Q pique', value: 10, numero: 25, path: '', sign : "Q ♠" });
  Cards.insert({ name: 'K pique', value: 10, numero: 26, path: '', sign : "K ♠" });
  Cards.insert({ name: 'As carreaux', value: 11, numero: 27, path: '', sign : "As ♦" });
  Cards.insert({ name: '2 carreaux', value: 2, numero: 28, path: '', sign : "2 ♦" });
  Cards.insert({ name: '3 carreaux', value: 3, numero: 29, path: '', sign : "3 ♦" });
  Cards.insert({ name: '4 carreaux', value: 4, numero: 30, path: '', sign : "4 ♦" });
  Cards.insert({ name: '5 carreaux', value: 5, numero: 31, path: '', sign : "5 ♦" });
  Cards.insert({ name: '6 carreaux', value: 6, numero: 32, path: '', sign : "6 ♦" });
  Cards.insert({ name: '7 carreaux', value: 7, numero: 33, path: '', sign : "7 ♦" });
  Cards.insert({ name: '8 carreaux', value: 8, numero: 34, path: '', sign : "8 ♦" });
  Cards.insert({ name: '9 carreaux', value: 9, numero: 35, path: '', sign : "9 ♦" });
  Cards.insert({ name: '10 carreaux', value: 10, numero: 36, path: '', sign : "10 ♦" });
  Cards.insert({ name: 'J carreaux', value: 10, numero: 37, path: '', sign : "J ♦" });
  Cards.insert({ name: 'Q carreaux', value: 10, numero: 38, path: '', sign : "Q ♦" });
  Cards.insert({ name: 'K carreaux', value: 10, numero: 39, path: '', sign : "K ♦" });
  Cards.insert({ name: 'As trefle', value: 11, numero: 40, path: '', sign : "As ♣" });
  Cards.insert({ name: '2 trefle', value: 2, numero: 41, path: '', sign : "2 ♣" });
  Cards.insert({ name: '3 trefle', value: 3, numero: 42, path: '', sign : "3 ♣" });
  Cards.insert({ name: '4 trefle', value: 4, numero: 43, path: '', sign : "4 ♣" });
  Cards.insert({ name: '5 trefle', value: 5, numero: 44, path: '', sign : "5 ♣" });
  Cards.insert({ name: '6 trefle', value: 6, numero: 45, path: '', sign : "6 ♣" });
  Cards.insert({ name: '7 trefle', value: 7, numero: 46, path: '', sign : "7 ♣" });
  Cards.insert({ name: '8 trefle', value: 8, numero: 47, path: '', sign : "8 ♣" });
  Cards.insert({ name: '9 trefle', value: 9, numero: 48, path: '', sign : "9 ♣" });
  Cards.insert({ name: '10 trefle', value: 10, numero: 49, path: '', sign : "10 ♣" });
  Cards.insert({ name: 'J trefle', value: 10, numero: 50, path: '', sign : "J ♣" });
  Cards.insert({ name: 'Q trefle', value: 10, numero: 51, path: '', sign : "Q ♣" });
  Cards.insert({ name: 'K trefle', value: 10, numero: 52, path: '', sign : "K ♣" });
}