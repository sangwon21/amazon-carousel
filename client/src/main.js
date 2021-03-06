import EventManager from "./event/event-manager.js";
import Slider from "./view/slider.js";
import { $ } from "./util/util.js";
import mockData from "./mock-data.js";


const addEvents = () => {
    const eventManager = new EventManager();
    eventManager.addEvents();
}

const renderHTML = async () => {
    const slider = new Slider();
    let cards = window.localStorage.getItem('cards');
    if (!cards) {
        const cardData = await slider.fetchCardData();
        window.localStorage.setItem("cards", JSON.stringify(cardData));
        cards = cardData;
        slider.setCardData(cards);
        $("#slider").innerHTML = slider.render();
        return;
    }
    slider.setCardData(JSON.parse(cards));
    $("#slider").innerHTML = slider.render();
}

const forBrowser = () => {
    const slider = new Slider();
    slider.setCardData(mockData);
    $("#slider").innerHTML = slider.render();
}

const initializeSettings = () => {
    const firstHeader = $(".header-list");
    firstHeader.classList.add("header-selected");
    firstHeader.querySelector(".circles").classList.remove("invisible");
    firstHeader.querySelector(".dot").classList.add("selected-dot");
}

const init = () => {
    forBrowser();
    addEvents();
    initializeSettings();
};

window.addEventListener("DOMContentLoaded", init);
