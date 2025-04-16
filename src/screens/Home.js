import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import Burger from '../images/Burger.jpeg';
import pizza from '../images/pizza.avif';
import pasta from '../images/pasta.jpeg';

export default function Home() {
  const [data2, setdata2] = useState([]); // foodCategory
  const [data1, setdata1] = useState([]); // food_items
  const [search, setSearch] = useState(""); // 🔍 Search input

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setdata1(response[0]);
    setdata2(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <form className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              
            </form>
          </div>
          <div className="carousel-item active">
            <img src={Burger} className="d-block w-100" alt="burger" style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src={pizza} className="d-block w-100" alt="pizza" style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src={pasta} className="d-block w-100" alt="pasta" style={{ filter: "brightness(30%)" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container'>
        {
          data2.length !== 0
            ? data2.map((category) => {
              const filteredItems = data1.filter(item =>
                item.CategoryName === category.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
              );

              return (
                <div key={category._id}>
                  <div className='fs-3 m-3'>{category.CategoryName}</div>
                  <hr />
                  <div className='row'>
                    {
                      filteredItems.length > 0
                        ? filteredItems.map(filteredItem => (
                          <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                            <Card
                              foodItem={filteredItem} // 👈 Pass the whole object
                              options={filteredItem.options[0]}
                              imgSrc={filteredItem.img}
                            />

                          </div>
                        ))
                        : <div className='text-center fs-5'>No Such Data Found</div>
                    }
                  </div>
                </div>
              );
            })
            : <div className="text-center mt-5">Loading...</div>
        }
      </div>
      <Footer />
    </div>
  );
}
