interface TProps {
  params: {
    aboutId: string;
  }
}

async function AboutDynamic({ params }: TProps) {
  console.log('test');
  return (<div>AboutId is: {params.aboutId}
  </div>)
}

export default AboutDynamic;
