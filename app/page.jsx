import MainHeader from "@/components/header/Mainheader/MainHeader"
// import Image from "next/image";

const Home = () => {
  return (
    <>
      <MainHeader />
      <section className="d-flex flex-column">
          <h1 className='head_text text-center'>   
          Discover & Share
          <br className='' />
          <span className='text-danger text-center'> ed-impact Software </span>
          </h1>
          <p className='text-center'>
          edimpact is a Software for School management, including portal for students, teachers and management. It also includes a platform for online learning, payment and exams.'
        </p>
      </section>
    </>
  )
}

export default Home
