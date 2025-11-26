import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import "./home.css";
import { PacmanLoader } from "react-spinners";

const Home = () => {
  const mainData = useSelector((state) => state.MainData);
  const dispatch = useDispatch();

  const handleAllCategory = (id) => {
    async function fetchdata() {
      const pr = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await pr.json();
      dispatch({ type: "AddMainData", payload: data });
    }
    fetchdata();
  };

  const handleAscendingSort = () => {
    const copyMainData = mainData;
    const ascendingData = copyMainData.sort((a, b) => {
      return a.price - b.price;
    });
    dispatch({ type: "ascending", payload: ascendingData });
  };

  const handleDescendingSort = () => {
    console.log("hi");
    const copyMainData = mainData;
    const descendingData = copyMainData.sort((a, b) => {
      return b.price - a.price;
    });
    dispatch({ type: "descending", payload: descendingData });
  };

  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <div className="main-filter-container">
          <div className="filter-container">
            <h5>Filter</h5>
            <h5>Clear</h5>
          </div>
          <div className="sort-container">
            <h5>Sort By Price</h5>
            <hr />
            <div className="low-high">
              <input
                name="sorting"
                type="radio"
                onChange={handleAscendingSort}
              />
              <span>Low to High</span>
            </div>

            <div className="high-low">
              <input
                name="sorting"
                type="radio"
                onChange={handleDescendingSort}
              />
              <span>High to Low</span>
            </div>
          </div>
          <div className="category-container">
            <div>
              <h5 className="category-heading">Category</h5>
              <hr />
            </div>
            <div className="all">
              <input
                name="category"
                type="radio"
                onChange={() => {
                  const id = "";
                  handleAllCategory(id);
                }}
              />
              <span>All</span>
            </div>
            <div className="men">
              <input
                name="category"
                type="radio"
                onChange={() => {
                  const id = "category/men's clothing";
                  handleAllCategory(id);
                }}
              />
              <span>Men</span>
            </div>
            <div className="women">
              <input
                name="category"
                type="radio"
                onChange={() => {
                  const id = "category/women's clothing";
                  handleAllCategory(id);
                }}
              />
              <span>Women</span>
            </div>
            <div className="jewelery">
              <input
                name="category"
                type="radio"
                onChange={() => {
                  const id = "category/jewelery";
                  handleAllCategory(id);
                }}
              />
              <span>Jewelery</span>
            </div>
            <div className="electronics">
              <input
                name="category"
                type="radio"
                onChange={() => {
                  const id = "category/electronics";
                  handleAllCategory(id);
                }}
              />
              <span>Electronics</span>
            </div>
          </div>
        </div>

        {
          mainData ?
            <div div className="cards-container">
              {mainData.map((eachCartdata) => {
                return <Card key={eachCartdata.id} eachCartdata={eachCartdata} />;
              })}
            </div>
            :
            <PacmanLoader
              color="#070707"
              size={1150}
            />
        }



      </div >
    </>
  );
};

export default Home;
