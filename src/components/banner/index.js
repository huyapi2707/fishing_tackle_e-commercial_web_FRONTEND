import { useEffect } from 'react';
import styles from './Banner.module.css';
import './slider.css';
import React from 'react';
class Carousel {
    constructor(items, controlsContainer) {
        this.carouselControlContainer = controlsContainer;
        this.carouselArray = [...items];
        this.timeStop = 0;
        this.interval = 0;
    }

    updateList() {
        this.carouselArray.forEach((el) => {
            el.classList.remove('imageBlock1');
            el.classList.remove('imageBlock2');
            el.classList.remove('imageBlock3');
            el.classList.remove('imageBlock4');
            el.classList.remove('imageBlock5');
        });
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`imageBlock${i + 1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.className === 'list-controls-next') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateList();
    }

    stop() {
        clearInterval(this.interval);
    }

    loop() {
        this.interval = setInterval(() => {
            this.timeStop++;
            if (this.timeStop > 60) {
                clearInterval(this.interval);
            }
            this.carouselArray.unshift(this.carouselArray.pop());
            this.updateList();
        }, 5000);
    }

    useControls() {
        const triggers = [...this.carouselControlContainer.childNodes];
        triggers.forEach((control) => {
            control.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}
function Banner() {
    const images = [
        'mathieu-le-roux-6_HqvY1E7NI-unsplash.jpg',
        'mark-olsen-LiHSIksyGq0-unsplash.jpg',
        'cooper-robbins-cmnFXXmux64-unsplash.jpg',
        'popescu-andrei-alexandru-7_JrIaA7P2A-unsplash.jpg',
        'wes-walker-WDCiBBj1eg0-unsplash.jpg',
    ];
    useEffect(() => {
        const buttonContainer = document.querySelector('.buttons');
        const imageItems = document.querySelectorAll('.imageBlock');

        const carousel = new Carousel(imageItems, buttonContainer);
        carousel.useControls();
        carousel.loop();
        return () => {
            carousel.stop();
        };
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <p className={styles.firstText}>Thỏa mãn đam mê cùng</p>
                <p className={styles.secondText}>pii câu cá</p>
                <p className={styles.slogan}>Chất lượng 🤝 Giá cả</p>
            </div>
            <div className={styles.image}>
                <div className="listImage">
                    {images.map((image, index) => (
                        <div className={`imageBlock imageBlock${index + 1}`} key={index}>
                            <img src={image} alt={image}></img>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    <button className="list-controls-previous">{'<'}</button>
                    <button className="list-controls-next">{'>'}</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Banner);
