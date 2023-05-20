import React, {useState,useEffect} from "react";
import  formStyle from "./Form.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createGames, searchGenres } from "../../redux/actions.js"
import {platforms} from "./form.js"


function Form() {
  const dispatch = useDispatch()

  const forGenre = useSelector(state => state.forGenre)

  // console.log(forGenre);
  // const [genres, ]
  const errorForm = useSelector(state  => state.errorForm)
  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    releaseDate: "",
    rating: 0,
    genres: []
  })
  const [error, setError] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    releaseDate: "",
    rating: 0,
    genres: []
  })

  useEffect(() => {
    
dispatch(searchGenres())
  }, [dispatch])


  
  // let errorValidate = () => {
    
    
  //   if (/^[a-zA-Z ]+$/.test(form.name)) {
  //     setError({
  //       ...error,
  //       name:  ""
  //     })      
  //   } else {
  //     setError({
  //       ...error,
  //       name: "Solo se permiten letras en este campo."
  //     })      
  //   }
     
  
  //   if(/^\d{4}-\d{2}-\d{2}$/.test(form.releaseDate)) {
  //     setError({
  //       ...error,
  //       releaseDate: ""
  //     })
  //     } else {
  //     setError({
  //       ...error,
  //       releaseDate:"Ingresa una fecha valida YYYY-MM-DD"
  //     })
      
  //   }
  
  //   if(form.rating < 0 || form.rating > 5) {
  //     setError({
  //       ...error,
  //       rating: 0
  //     })
  //   } else {
  //     setError({
  //       ...error,
  //       rating: "Ingresa un número de 0 a 5"
  //     })
  //   }
  
  //   setError(error);
  // }
  const errorValidate = () => {
    let newErrors = {};
  
    if (!form.name) {
      newErrors.name = "Este campo es requerido.";
    } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
      newErrors.name = "Solo se permiten letras en este campo.";
    } else {
      newErrors.name = "";
    }
  
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.releaseDate)) {
      newErrors.releaseDate = "Ingresa una fecha valida YYYY-MM-DD";
    } else {
      newErrors.releaseDate = "";
    }
    
  
    if (form.rating < 0 || form.rating > 5) {
      newErrors.rating = "Ingresa un número de 0 a 5";
    } else {
      newErrors.rating = "";
    }
  
    setError({ ...error, ...newErrors });
  };
  
  let handleOnchange = (event) => {
    event.target.name === "platforms" ?
    setForm({
      ...form,
      platforms:[...form.platforms, event.target.value]
    })
    : event.target.name === "genres" ?
    setForm({
      ...form,
      genres:[...form.genres, event.target.value]
    })
    : setForm({
      ...form,
        [event.target.name]: event.target.value
      })
      errorValidate(event.target.value)
      
  };


  let handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGames(form))
    resetForm()
  }

  // FALTA EL HANDLE SELECT
  // function handleSelect(e) {
  //   const selectedDessert = e.target.value;
  //   setForm({
  //     ...form,
  //     desserts: [...form.desserts, selectedDessert],
  //   });
  //   e.target.value = ""; //limpiar el valor seleccionado
  // }

  // ELBORRADO DEL HANDLE SELECT
  // function handleDelete(el) {
  //   setForm({
  //     ...form,
  //     desserts: form.desserts.filter((occ) => occ !== el),
  //   });
  // }
  // let handleGenre = () => {
    
  // }
const resetForm = () => {
  setForm({
    name: "",
    description: "",
    platforms: [],
    image: "",
    releaseDate: "",
    rating: 0,
    genres: []
  })
}


  return(
    <div className={formStyle.formulario}>
      <Link to="/videogames"><button className={formStyle.botonHome}>Home</button></Link>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name" >name:
        <input type="text"  name="name" value={form.name} onChange={handleOnchange} placeholder="by name"/>
      {error.name && <p>{error.name}</p> }
      </label>
      <label htmlFor="description">description:
        <textarea type="text"  name="description" value={form.description} onChange={handleOnchange} />
      </label>
    
      <label htmlFor="platforms">platforms:
          <select name="platforms"    onChange={handleOnchange}  >
            {platforms.map((platform, index) => (
              <option value={platform} key={index}>
                {platform}
              </option>
            ))}
          </select>
        </label>

      <label htmlFor="image">image:
        <input type="url"  name="image" value={form.image} onChange={handleOnchange} />
      </label>

      <label htmlFor="releaseDate">releaseDate:
        <input type="text"  name="releaseDate" value={form.releaseDate} onChange={handleOnchange} />
        {error.releaseDate && <p>{error.releaseDate}</p> }
      </label>
      
      <label htmlFor="rating">rating:
        <input type="text"  name="rating" value={form.rating} onChange={handleOnchange} />
        {error.rating && <p>{error.rating}</p> }
      </label>
        {/* FALTA EL HANDLE SELECT  */}
        <label htmlFor="genres">genres:
          <select name="genres"   onChange={handleOnchange}  >
            {forGenre?.map((genre, index) => (
              <option value={genre.name} key={index}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
       
    <button className={formStyle.boton} type="submit">crear Receta</button>
          {/* {errorCreate !== "" ? <p>{errorCreate}</p> : ""} */}
          {<h5>{form.genres.map(genre => genre + ", " )}</h5>}
          {<h5>{form.platforms.map(platform => platform + ", " )}</h5>}
          {errorForm !== "" ?  <h6>{errorForm}</h6> : ""}
      </form>
    </div> 
  )
}

export default Form;






////**************************** */



// import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// import { postDessert, getDessert } from "../../redux/actions/index";
// import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../../components/Navbar/Navbar";
// import style from "./dessert.module.css";

// export default function CreateDessert() {
//   const dispatch = useDispatch();
// //   const navigate = useNavigate();

//   const desserts = useSelector((state) => state.dessert);
//   const errorForm =  useSelector(state => state.errorForm);
//   const [errors, setErrors] = useState({
//     name: "",
//     summary: "",
//     description: "",
//     image: "",
//     price: 0,
//     desserts: [],
//   });

//   const [form, setForm] = useState({
//     name: "",
//     summary: "",
//     description: "",
//     image: "",
//     price: 0,
//     desserts: [],
//   });

//   function validate() {
//     let newErrors = {};
//     if (!form.name) {
//       newErrors.name = "Se requiere un nombre para el postre";
//     } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
//       newErrors.name = "No se permiten numeros"
//     } else {
//       newErrors.name = ""
//     }

//     if (!form.summary) {
//       newErrors.summary = "Se requiere completar el summary";
//     } else {
//       newErrors.summary = ""
//     }


//     if (!form.description) {
//       newErrors.description = "Se requiere completar la descripcion";
//     } else {
//       newErrors.description = ""
//     }

//     if (!form.desserts) {
//       newErrors.desserts = "Se requiere conocer el postre";
//     } else {
//       newErrors.desserts = ""
//     }

  
//     setErrors({ ...errors, ...newErrors });
//   }

//   function handleChange(e) {
//     e.target.name === "dessert"
//       ? setForm({
//           ...form,
//           desserts: [...form.desserts, e.target.value],
//         })
//       : setForm({
//           ...form,
//           [e.target.name]: e.target.value,
//         });
//     validate(e.target.value);
//   }

//   function handleDelete(value) {
//     setForm({
//       ...form,
//       desserts: form.desserts.filter((occ) => occ !== value),
//     });
//   }

//   useEffect(() => {
//     dispatch(getDessert());
//   }, [dispatch]);

//   function handleSelect(e) {
//     const selectedDessert = e.target.value;
//     setForm({
//       ...form,
//       desserts: [...form.desserts, selectedDessert],
//     });
//     e.target.value = ""; //limpiar el valor seleccionado
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
    
//     dispatch(postDessert(form));
    
//     resetForm()
//     // navigate("/Products");
//   }

//   const resetForm = () => {
//     setForm({
//       name: "",
//     summary: "",
//     description: "",
//     image: "",
//     price: 0,
//     desserts: [],
//     })
//   }
//     return(
//         <div className={style.cont}>
//             <NavBar/>
//             <h1>Crea tu postre!</h1>
//             <form onSubmit={(e) => handleSubmit(e)} className="form">

//                 <div>
//                     <label className="label">Nombre:</label>
//                     <input 
//                     type="text"
//                     value={form.name}
//                     name="name"
//                     onChange={handleChange}
//                     />
//                     {errors.name && (
//                         <p className='error'>{errors.name}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label>Summary:</label>
//                     <input 
//                     type="text"
//                     value={form.summary}
//                     name="summary"
//                     onChange={handleChange}
//                     />
//                      {errors.summary && (
//                         <p className='error'>{errors.summary}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label>Descripcion:</label>
//                     <input 
//                     type="text"
//                     value={form.description}
//                     name="description"
//                     onChange={handleChange}
//                     />
//                      {errors.description && (
//                         <p className='error'>{errors.description}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label>Price:</label>
//                     <input 
//                     type="number"
//                     value={form.price}
//                     name="price"
//                     onChange={handleChange}
//                     />
//                      {errors.price && (
//                         <p className='error'>{errors.price}</p>
//                     )}
//                 </div>
//                 <div>
//                     <label>Imagen PNG:</label>
//                     <input 
//                     type="text"
//                     value={form.image}
//                     name="image"
//                     onChange={handleChange}
//                     />
//                      {errors.image && (
//                         <p className='error'>{errors.image}</p>
//                     )}
//                 </div>
//                 <label htmlFor="desserts">Dessert:</label>
//           <select name="desserts"   onChange={handleSelect}  >
//             {desserts?.map((el, index) => (
//               <option value={el} key={index}>
//                 {el}
//               </option>
//             ))}
//           </select>
        

//                 <br>
//                 </br>
//                 <p/>
//               <ul><li>{form.desserts?.map(el => el + " , ")}</li></ul>
//               <button type='submit' className="button">Crear Postre</button>
//               {errorForm !== "" ?  <h6>{errorForm}</h6> : ""}
//             </form>
//               {
                  
//                   form.desserts?.map(el => 
//                     <div className="divOcc">
//                     <p className="divOcc">{el}</p>
//                     <button className=" botonX" onClick={() => handleDelete(el)}>X</button>
//                     </div>
//                 )
//             }
            
//         </div>
//     )

// }
