import React from "react";
import FormContact from "./form";
import t from "./../resources/translate"

const PanelContact = (props) =>{
    const mapJoseMarmol = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d382617.3199213441!2d-58.632208252009555!3d-34.56557698360964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb3faddba8be7%3A0x93e8f54e16d05cc5!2sBuenos%20Aires%20Metropolitan%20Area!5e0!3m2!1ses-419!2sar!4v1784664611263!5m2!1ses-419!2sar"
    const title = props.title ? props.title : t("CONTACT");

    return (
        <div className="tm-section-wrap">
            <div className="tm-parallax" data-parallax="scroll" data-image-src="img/contacto.webp" id="imgContact"></div>
            <div id="contact" className="tm-section">
                <h2 className="tm-text-primary">{title}</h2>
                <hr className="mb-5" />
                <div className="row">
                    <div className="col-xl-6 tm-contact-col-l mb-4">
                        <FormContact/>
                    </div>
                    <div className="col-xl-6 tm-contact-col-r">
                        <div className="mapouter mb-4">
                            <div className="gmap_canvas">
                                    <iframe src={mapJoseMarmol}
                                      width="100%" height="520" id="gmap_canvas"
                                      frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                            </div>
                        </div>

                        <div className="mb-4">
                            {props.AditionalInfo}
                        </div>

                        <ul className="tm-contact-links mb-4">
                            <li className="mb-2">
                                <a href={"https://api.whatsapp.com/send?phone="+props.Phone} target="_blank">
                                    <i className="fas fa-phone mr-2 tm-contact-link-icon"></i>
                                    {t("PHONE")}: +{props.Phone}
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@company.com">
                                    <i className="fas fa-at mr-2 tm-contact-link-icon"></i>
                                    {t("EMAIL")}: {props.Email}
                                </a>
                            </li>
                        </ul>
                        <ul className="tm-contact-social">
                            {props.Facebook ? <li><a target="_blank" href={"https://fb.com/" + props.Facebook} className="tm-social-link"><i className="fab fa-facebook"></i></a></li> : ""}
                            {props.X ? <li><a target="_blank" href={"https://x.com/" + props.X} className="tm-social-link"><i className="fab fa-twitter"></i></a></li> : ""}
                            {props.Instagram ? <li><a target="_blank" href={"https://instagram.com/" + props.Instagram} className="tm-social-link"><i className="fab fa-instagram"></i></a></li> : ""}
                            {props.Youtube ? <li><a target="_blank" href={"https://youtube.com/" + props.Youtube} className="tm-social-link"><i className="fab fa-youtube"></i></a></li> : ""}
                            {props.Linkedin ? <li><a target="_blank" href={"https://www.linkedin.com/in/" + props.Linkedin} className="tm-social-link"><i className="fab fa-linkedin"></i></a></li> : ""}
                            {props.Podcast ? <li><a target="_blank" href={"https://www.ivoox.com/" + props.Podcast} className="tm-social-link"><i className="fa fa-podcast"></i></a></li> : ""}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelContact;