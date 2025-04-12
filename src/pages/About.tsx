
import PageHeader from '../components/PageHeader';

const About = () => {
  return (
    <div>
      <PageHeader 
        title="About Us" 
        subtitle="Learn about our mission, values, and the story behind SOAR Community"
      />
      
      <section className="py-16 md:py-24 bg-nude-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Our Mission</h2>
              <p className="text-lg text-primary/80 mb-6">
                At SOAR Community, we believe in the transformative power of education, support, and community. Our mission is to empower individuals to reach their highest potential by providing them with the tools, resources, and connections necessary for personal and professional growth.
              </p>
              <p className="text-lg text-primary/80">
                We strive to create a nurturing environment where members can learn, share experiences, and build meaningful relationships that foster continuous development and success.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Growth</h3>
              <p className="text-primary/80">
                We believe in continuous learning and development. Every experience is an opportunity to grow and evolve.
              </p>
            </div>
            
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Community</h3>
              <p className="text-primary/80">
                We foster a supportive network where members can connect, collaborate, and inspire one another.
              </p>
            </div>
            
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Excellence</h3>
              <p className="text-primary/80">
                We strive for excellence in everything we do, from the content we create to the experiences we provide.
              </p>
            </div>
            
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Authenticity</h3>
              <p className="text-primary/80">
                We value genuine connections and encourage members to embrace their unique qualities and perspectives.
              </p>
            </div>
            
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Empowerment</h3>
              <p className="text-primary/80">
                We empower individuals to take charge of their journey and pursue their goals with confidence.
              </p>
            </div>
            
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Innovation</h3>
              <p className="text-primary/80">
                We embrace creativity and innovation, constantly seeking new ways to enhance our offerings and better serve our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-nude-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Join Our Community</h2>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto mb-8">
            Become part of a supportive network dedicated to personal and professional growth. Together, we can soar to new heights.
          </p>
          <a href="/join" className="btn-primary">Join Us Today</a>
        </div>
      </section>
    </div>
  );
};

export default About;
