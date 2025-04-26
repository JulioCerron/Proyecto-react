import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';


class App extends React.Component {   

  constructor(props) {
    super(props);
    this.state = {
      book:[
        {id:0, rating: 4, title: 'Harry Potter y el cáliz de fuego', image: 'libro01.png'},
        {id:1, rating: 3, title: 'The shining', image: 'libro02.png'},
        {id:2, rating: 5, title: 'Código Da Vinci', image: 'libro03.png'},
        {id:3, rating: 5, title: 'El principito', image: 'libro04.png'},
        {id:4, rating: 5, title: 'Sobrenatural', image: 'libro05.png'}
      ],

      copyBook:[]

    };
  }
     componentDidMount() {
      this.initBook();
 
  }

   initBook=() => {
    this.setState((state,props) => ({  
     copyBook:[...state.book]
    }));

}
   onAdd = (item) => {
    let temp=[...this.state.book];
    const id = temp[temp.length-1].id +1;
    item['id'] = id;
    temp.push(item);
   
    this.setState({book: [...temp]});
    this.initBook();
 

   }

   onSearch = (query) => {
    if (query === '') {
      this.setState({copyBook: [...this.state.book]});
    } else {
      const temp = [...this.state.book];
      let res =[];

      temp.forEach(item => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          res.push(item);
        }
      });
      this.setState({copyBook: [...res]});


    }
  }
  onUpdateRating = (updatedItem) => {
    const temp = [...this.state.book];
    const index = temp.findIndex(item => item.id === updatedItem.id);
  
    if (index !== -1) {   // Solo actualizo si encontré el libro
      temp[index].title = updatedItem.title;
      temp[index].image = updatedItem.image;
      temp[index].rating = updatedItem.rating;
  
      this.setState({ book: temp });
      this.initBook();
    } else {
      console.error('Libro no encontrado para actualizar:', updatedItem);
    }
  }

  onRemove = (id) => {
    var temp = [...this.state.book];
    const res = temp.filter((item) => item.id !== id);

    this.setState({ book: [...res] });
    this.initBook();
  };

 render() {
  return(
    <div className="app">
      <Menu title="Amazon" onadd={this.onAdd} onsearch={this.onSearch}/>
      <List 
      items={this.state.copyBook} 
      onupdaterating={this.onUpdateRating}
      onremove={this.onRemove}/>
      
    </div>
    
  );
}
}
export default App;
