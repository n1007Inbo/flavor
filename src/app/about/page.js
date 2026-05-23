import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Story | FlavorZing',
  description: 'Learn about our passion for flavor chemistry, gastronomy science, and modern recipe engineering at FlavorZing.',
};

export default function About() {
  const team = [
    {
      name: "Chef Elena Rostova",
      role: "Culinary Director & Food Scientist",
      bio: "Former molecular gastronomy lead in Paris, Elena blends laboratory flavor profiling with classic French and modern Slavic cooking techniques.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&h=500&q=80"
    },
    {
      name: "Marcus Baker",
      role: "Lead Baker & Fermentation Master",
      bio: "Devoting 15 years to wild lactobacillus ecosystems, Marcus guides our community through sourdough hydrates, bulk risings, and oven mechanics.",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&h=500&q=80"
    },
    {
      name: "Yuki Tanaka",
      role: "Beverage Infusion Architect",
      bio: "A mixology champion from Kyoto, Yuki bridges ceremonial botanicals, dynamic tea acids, and fermented cordials in our liquid laboratory.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=500&q=80"
    }
  ];

  return (
    <>
      {/* Page Header */}
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>
            Our Gastronomy <em>Philosophy</em>
          </h1>
          <p className={styles.intro}>
            FlavorZing is a dedicated online laboratory exploring the chemical intersections, cultural heritages, and sensory aesthetics of food and drink.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2>The Collision of Science and Palate</h2>
              <p>
                We believe that cooking is the ultimate daily synthesis of art and science. Every aroma that drifts from a hot skillet, every blister on a freshly baked sourdough loaf, and every spark of heat from a ground spice is a chemical event waiting to be understood.
              </p>
              <p>
                FlavorZing was founded in 2026 to dismantle the mystery surrounding modern high-end gastronomy. We want to empower home cooks with the underlying principles used by professional flavor pairing scientists and three-star Michelin chefs.
              </p>
              <p>
                By connecting a headless Next.js frontend with our WordPress backend database on Hostinger, we deliver high-performance, fast-loading, dynamic articles. This structural approach guarantees that our readers receive sensory insights at lightning-fast speed, without generic bloated plugins cluttering the screen.
              </p>
            </div>

            <div className={styles.storyImgWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                alt="Gourmet kitchen workspace"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 992px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className={styles.quoteSection}>
        <div className="container">
          <p className={styles.quote}>
            "Flavor is not just a taste on the tongue. It is a complex cognitive landscape of aroma, physical texture, and thermal memories."
          </p>
          <span className={styles.quoteAuthor}>— FlavorZing Test Kitchen manifesto</span>
        </div>
      </section>

      {/* Editorial Team */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className="section-header">
            <span>Our Experts</span>
            <h2>Editorial Team & Chefs</h2>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className={`glass ${styles.memberCard}`}>
                <div className={styles.memberImgWrapper}>
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  />
                </div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberRole}>{member.role}</span>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
