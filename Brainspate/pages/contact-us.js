import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import uploadIcon from "/public/images/Home-resources/Upload File.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "@/src/apollo/client";
import { ContactQuery } from "@/src/queries/contactQuery";
import Review from "@/src/components/review";
import contectMap from "../public/images/contect-map.png";
import Layout from "@/src/components/layouts";
import { FooterQuery } from "@/src/queries/footerQuery";
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import { useRouter } from "next/router";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
  budget: "",
  country: "",
  pageurl:"",
  attachment: "",
};

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phoneNumber: Yup.number().required("Please enter your phone number"),
  message: Yup.string().required("Please enter your message"),
  budget: Yup.string().required("Please select any option"),
  attachment: Yup.mixed(),
});

const ContactUs = (contactData) => {

  let image_path ="/images/no-image-available.webp";


  const testimonialPageContent = contactData?.testimaonialDetails.page;
  const inputRef = useRef(null);
  const captcha = useRef(null);
  const [file, setFile] = useState();
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const router = useRouter();
  const [is_loading_show, setLoadingImage] = useState('')
  const [is_submit_disabled, setDisableButton] = useState('')

 
  const currentUrl = router.asPath;
  initialValues.pageurl=process.env.NEXT_PUBLIC_WEBSITE_DOMAIN+currentUrl;
  
  async function fetchIpAddress() {
    if(!country) {
      console.log("country : ",country);
      try {
        
  
        // console.log(" log 1 ");
        let response = await fetch('https://geolocation-db.com/json/');
        if (!response.ok) {
          // console.log(" log 2 ");
          try {
            
            // console.log(" log 4 ");
            // response = await fetch('https://ipapi.co/json/');
            response = await fetch('https://ipapi.co/json/');
            // console.log(" log 4.1 : ",response.data);
            if (!response.ok) {
                try {
            
                  // console.log(" log 4 ");
                  response = await fetch('https://ipinfo.io/json?token=78f8b81d3d3447');
                  console.log(" log 4.1 : ",response);
                  if (!response.ok) {
                      console.log(" log 5 ",response);
                      throw new Error('Network response was not ok.');
                    } else {
            
                      console.log(" log 6 :  ",response.json());
                      const data = await response.json();
                      // console.log(" log 6.1 :  ",data.country_name);
                      setCountry(data.country)
                      // console.log(" log 6.2 :  ",country);
                      initialValues.country=data.country;
                      initialValues.pageurl=process.env.NEXT_PUBLIC_WEBSITE_DOMAIN+currentUrl;
                      return data.country
                      // console.log(" log 6.3 :  ",initialValues);
                    }
                } catch (error) {
                  
                }
                // console.log(" log 5 ",response.geoplugin_request);
                // throw new Error('Network response was not ok.');
              } else {
      
                // console.log(" log 6 :  ",response.json());
                const data = await response.json();
                // console.log(" log 6.1 :  ",data.country_name);
                setCountry(data.country_name)
                // console.log(" log 6.2 :  ",country);
                initialValues.country=data.country_name;
                initialValues.pageurl=process.env.NEXT_PUBLIC_WEBSITE_DOMAIN+currentUrl;
                return data.country_name
                // console.log(" log 6.3 :  ",initialValues);
              }
          } catch (error) {
            
          }
            
          throw new Error('Network response was not ok.');
        } else {
          // console.log(" log 3 ");
          const data = await response.json();
          setCountry(data.country_name)
          initialValues.country=data.country_name;
          initialValues.pageurl=process.env.NEXT_PUBLIC_WEBSITE_DOMAIN+currentUrl;
          return data.country_name
        }
      } catch (error) {
        try {
          
          // console.log(" log 4 ");
          let response = await fetch('https://ipapi.co/json/');
          // console.log(" log 4.1 : ",response.data);
          if (!response.ok) {
              // console.log(" log 5 ",response.geoplugin_request);
              throw new Error('Network response was not ok.');
            } else {
    
              // console.log(" log 6 :  ",response.json());
              const data = await response.json();
              // console.log(" log 6.1 :  ",data.country_name);
              setCountry(data.country_name)
              // console.log(" log 6.2 :  ",country);
              initialValues.country=data.country_name;
              initialValues.pageurl=process.env.NEXT_PUBLIC_WEBSITE_DOMAIN+currentUrl;
              return data.country_name
              // console.log(" log 6.3 :  ",initialValues);
            }
        } catch (error) {
          try {
          
            // console.log(" log 4 ");
            let response = await fetch('https://ipinfo.io/json?token=78f8b81d3d3447');
            // console.log(" log 4.1 : ",response.data);
            if (!response.ok) {
                // console.log(" log 5 ",response.geoplugin_request);
                throw new Error('Network response was not ok.');
              } else {
      
                // console.log(" log 6 :  ",response.json());
                const data = await response.json();
                // console.log(" log 6.1 :  ",data.country_name);
                setCountry(data.country)
                // console.log(" log 6.2 :  ",country);
                initialValues.country=data.country;
                initialValues.pageurl=process.env.NEXT_PUBLIC_WEBSITE_DOMAIN+currentUrl;
                return data.country
                // console.log(" log 6.3 :  ",initialValues);
              }
          } catch (error) {
            
          }
        }
  
        
      }
    }
  }
  // Call the fetchIpAddress function to get the IP address & country name
  // fetchIpAddress();
 const handle = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setFile(fileObj);
    if (!fileObj) {
      return;
    }
  };

  const notifySuccess = () =>
    toast.success("Form submited successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const notifyError = () => {
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const {
    values,
    errors,
    touched,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      setLoadingImage('1');
      setDisableButton('1');
      let resp_country = await fetchIpAddress();
      // values.country = country
      values.country = resp_country
      console.log("values : ",values);
      console.log("resp_country : ",resp_country);
      values.phoneNumber =
        values.phoneNumber * 1; /* converted string into number */
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST_DEV}/contact`,
          {            
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        let resJson = await res.json();
        setLoadingImage('');
        setDisableButton('');
        if (res.status === 200) {
          setMessage("Form submited successfully");
          setFile(null);
          notifySuccess();
          captcha.current.reset();
          router.push(`/thank-you`);
        } else {
          setLoadingImage('');
          setDisableButton('');
          setMessage("Some error occured");
          notifyError();
        }
      } catch (err) {
        setLoadingImage('');
        setDisableButton('');
        console.log(err);
      }
      action.resetForm();
    },
  });

  /*useEffect(() => {
    // fetchData();
  }, []);
*/
  const onChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    // <!-- Header -->
    <div className="contact-page">
      <Layout data={contactData.footerData}>
        <GlobalHead
          seoData={contactData?.data?.page.seo.seoSection}
          googleTagData={
            contactData.footerData.generalSettings.acfGeneralSettings
          }
        />

        <div className="get-in-touch contact-us">
          <Container>
            <div className="get-in-touch-inner d-flex flex-wrap">
              <div className="contact-form-sec w-80">
                <div className="contact-form-inner">
                  <div className="main-title res-tab">
                    <h1>
                      <span>Get In Touch</span> With Us
                    </h1>
                    <div className="sub-title">
                      Get answers of your queries by filling this form with all
                      the details requested.
                    </div>
                  </div>

                  <form
                    className="form-field"
                    onSubmit={handleSubmit}
                    method="post"
                    id="formElem"
                  >
                    <div className="floating-form">
                      <div className="floating-label">
                        <div className="">
                          <input
                            className="floating-input"
                            type="name"
                            autoComplete="off"
                            placeholder=" "
                            name="name"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <label className="form-label">Name</label>
                        </div>
                        {errors.name && touched.name ? (
                          <p className="field-error">{errors.name}</p>
                        ) : null}
                      </div>

                      <div className="floating-label">
                        <div className="">
                          <input
                            className="floating-input"
                            type="email"
                            placeholder=" "
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <label className="form-label">Email</label>
                        </div>
                        {errors.email && touched.email ? (
                          <p className="field-error">{errors.email}</p>
                        ) : null}
                      </div>

                      <div className="floating-label">
                        <div className="">
                          <input
                            className="floating-input"
                            type="tel"
                            name="phoneNumber"
                            placeholder=" "
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <label className="form-label">Phone Number</label>
                        </div>
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <p className="field-error">{errors.phoneNumber}</p>
                        ) : null}
                      </div>

                      <div className="floating-label">
                        <div className={values.budget == "" ? "test" : ""}>
                          <select
                            className="select select-arrow"
                            name="budget"
                            id="budget"
                            value={values.budget}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" className="form-label">
                              Select Budget
                            </option>
                            <option value="$1000 - $2000">$1000 - $2000</option>
                            <option value="$2000 - $5000">$2000 - $5000</option>
                            <option value="$5000 - $10000">$5000 - $10000</option>
                            <option value="$10000+">$10000+</option>
                          </select>
                        </div>
                        {errors.budget && touched.budget ? (
                          <p className="field-error">{errors.budget}</p>
                        ) : null}
                      </div>

                      <div className="floating-label">
                        <div className="">
                          <textarea
                            className="floating-input"
                            name="message"
                            placeholder=" "
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></textarea>
                          <label>Message</label>
                        </div>
                        {errors.message && touched.message ? (
                          <p className="field-error">{errors.message}</p>
                        ) : null}
                      </div>

                      <div className="form-content d-flex flex-wrap">
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                          // sitekey="6LeES7YlAAAAANvD_dQDAIbjiVuQDIHyJ53Gwe1I"
                          onChange={onChange}
                          ref={captcha}
                        />
                        <div className="upload">
                          <input
                            style={{ display: "none" }}
                            ref={inputRef}
                            type="file"
                            name="attachment"
                            // value="attechment"
                            onChange={(event) => {
                              let reader = new FileReader();
                              reader.onload = () => {
                                if (reader.readyState === 2) {
                                  setFieldValue("attachment", reader.result);
                                }
                              };
                              reader.readAsDataURL(event.target.files[0]);
                              const fileObj =
                                event.target.files && event.target.files[0];
                              setFile(fileObj);
                              if (!fileObj) {
                                return;
                              }
                            }}
                            accept=".jpg, .png, .pdf"
                            onBlur={handleBlur}
                          />
                          <div className="upload-btn" onClick={handle}>
                            <span>
                              {file && file ? file.name : "Upload File"}
                            </span>
                            <Image
                              src={uploadIcon.src}
                              alt="Picture of the author"
                              height={44}
                              width={40}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="floating-button">
                      <input
                        type="submit"
                        name="submit"
                        value="Submit"
                        className={`submit-btn ${is_submit_disabled == 1 ? "disable" : ""}`}
                        // disabled={!dirty}
                      />
                     {
                     
                     is_loading_show == 1   ? (
                      <span className="loader-1"> </span>
                      ) : ''}

                    </div>
                    <ToastContainer />
                  </form>
                </div>
              </div>
              <div className="contact-detail">
                <div className="content-us-inner">
                  <h2 className="white-text">Contact Us</h2>
                  <ul>
                    <li className="contact-us-loction india-flag">
                      <h3 className="white-text"  dangerouslySetInnerHTML={{
                            __html:
                            contactData?.data?.page.contactPage
                            .contactDetailsSection.countryTitle,
                          }}>
                      </h3>
                      <div className="contect-address">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              contactData?.data?.page.contactPage
                                .contactDetailsSection.addAddress,
                          }}
                        ></p>
                      </div>
                    </li>
                    <li className="contact-us-loction usa-flag">
                      <h3 className="white-text"  dangerouslySetInnerHTML={{
                            __html:
                            contactData?.data?.page.contactPage
                            .contactDetailsSection.usaCountryTitle,
                          }}>
                      </h3>
                      <div className="contect-address">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              contactData?.data?.page.contactPage
                                .contactDetailsSection.usaAddress,
                          }}
                        ></p>
                      </div>
                    </li>
                    <li className="contact-us-number">
                      <a
                        href={
                          "tel:" +
                          contactData?.data?.page.contactPage
                            .contactDetailsSection.addNumber
                        }
                      >
                        {
                          contactData?.data?.page.contactPage
                            .contactDetailsSection.addNumber
                        }
                      </a>
                    </li>
                    <li className="contact-us-email">
                      <a
                        href={
                          "mailto:" +
                          contactData?.data?.page.contactPage
                            .contactDetailsSection.addEmail
                        }
                      >
                        {
                          contactData?.data?.page.contactPage
                            .contactDetailsSection.addEmail
                        }
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <div className="contect-img">
                  <Image
                    src={contectMap.src}
                    alt="contectMap"
                    style={{ height: "100%" }}
                    height={382}
                    width={410}
                  />
                </div> */}
              </div>
            </div>
          </Container>
        </div>
        <div className="review">
          <Review data={testimonialPageContent} />
        </div>
      </Layout>
    </div>
  );
};

export default ContactUs;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const {
    data: contactData,
    loading,
    networkStatus,
  } = await client.query({
    query: ContactQuery,
  });

  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: testimaonialDetails } = await client.query({
    query: TestimonialQuery,
  });

  return {
    props: {
      data: contactData,
      footerData: footerData,
      testimaonialDetails: testimaonialDetails,
    },
    revalidate: revalidateInterval,
  };
}
