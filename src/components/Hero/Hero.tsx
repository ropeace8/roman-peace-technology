import heroImage from './hero-image.png';
import './Hero.css';

function Hero() {
    return (
        <section className="hero" aria-label="Hero">
            <img className="hero-img" src={heroImage} aria-label="Wide header image" />
        </section>
    )
}

export default Hero;