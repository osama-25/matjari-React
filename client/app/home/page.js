import NavBar from "./NavBar";
import Categories from "./Categories";
import ItemsDisplay from "./ItemsDisplay";
import AdDisplay from "./AdDisplay";

export default function Home() {
  return (
    <>
      <NavBar />
      <AdDisplay imageUrl={'https://opensooqui2.os-cdn.com/prod/public/images/homePage/spotlight/desktop/en/11-v2.webp'} altText={'AD'}/>
      <Categories />
      <ItemsDisplay />
    </>
  );
}
