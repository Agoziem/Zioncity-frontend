import Image from "next/image";
import "./page.module.css";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className='head_text text-center'>   
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> ed-impact Software </span>
      </h1>
      <p className='desc text-center'>
      edimpact is a Software for School management, including portal for students, teachers and management. It also includes a platform for online learning, payment and exams.'
    </p>
    
    </section>
  )
}

export default Home
