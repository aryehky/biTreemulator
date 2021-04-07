import React from 'react';
import { useEffect, useRef } from 'react';
//import { glslToMinimalRenderer } from 'shader-park-core';
import {sculptToMinimalRenderer} from 'shader-park-core';
import './Gallery.scss';
import chevronImg from "../../assets/Icons/chevron_right-24px.svg";
import axios from 'axios';
import GenotypeColoring from '../GenotypeColoring/GenotypeColoring';
//import { API_URL } from "../../utils/utils";
//import GenotypeColoring from "../GenotypeColoring/GenotypeColoring.jsx";
 /* eslint-disable */
function snpCode()  {
  let current;
  let filledG = (input) => {
      let newG = new Array(1).fill(input);
      console.log(newG);
      let valInt = newG.values();
      for (let snp of valInt) {
        if (snp === "AA") {
         current = 0.1;
        strand(current);
      } else if (snp === "AT") {
          console.log("red green");
          current = 0.2;
          strand(current);
        } else if (snp === "AG") {
          console.log("red orange");
           current = 0.3;
          strand(current);
        } else if (snp === "AC") {
          console.log("red green");
          current = 0.4;
          strand(current);
        } else if (snp === "TA") {
          console.log("green");
          current = 0.5;
          strand(current);
        } else if (snp === "TT") {
          console.log(" light green");
          current = 0.6;
          strand(current);
        } else if (snp === "TG") {
          console.log("green blue");
          current = 0.7;
          strand(current);
        } else if (snp === "TC") {
          console.log("green red");
          current = 0.8;
          strand(current);
        } else if (snp === "GA") {
          console.log("blue red");
          current = 0.9;
          strand(current);
        } else if (snp === "GT") {
          console.log("blue green");
          current = 0.31;
          strand(current);
        } else if (snp === "GG") {
          console.log("blue");
          current = 0.43;
          strand(current);
        } else if (snp === "GC") {
          console.log("blue pink");
          current = 0.43;
          strand(current);
        } else if (snp === "CA") {
          console.log("pink red");
          current = 0.21;
          strand(current);
        } else if (snp === "CT") {
          console.log("pink green");
          current = 0.59;
          strand(current);
        } else if (snp === "CG") {
          console.log("pink blue");
          current = 0.377;
          strand(current);
        } else if (snp === "CC") {
          console.log("pink");
          current = 0.311;
          strand(current);
      } else if (snp === "??") {
          /*********IF COME ACCROSS A ?? GENOTYPE *****/
          let current = 0.3;
          strand(current);
        }else {
        console.log('done ');
      
        }
      }
      
      let thickness = 0.02;
      let zed = 0.0;
      let change;
      /*****************SPHERE VARIABLES**********/
      let positiveTopSphere = 0.1;
      let negativeTopSphere = 0.1; //0.1
      let positiveBottomSphere = -0.1; //-0.1
      let negativeBottomSphere = -0.1;
      /**************SNP VARIABLES***********/
      let positiveTopSNP1 = 0.1;
      let negativeTopSNP1 = -0.1;//0.021
      let positiveBottomSNP2 = -0.1;
      let negativeBottomSNP2 = -0.02; //0.0
      /****************OUTER SPHERES**************/
      let pos1 = vec3(positiveTopSphere, positiveTopSphere, zed); //x,y
      let pos2 = vec3(negativeTopSphere, negativeTopSphere, zed); //-x, -y
      let pos3 = vec3(positiveBottomSphere, positiveBottomSphere, zed); //x,y
      let pos4 = vec3(negativeBottomSphere, negativeBottomSphere, zed); //-x, -y
      /*******************SNPS**********************/
      let pos5 = vec3(positiveTopSNP1, positiveTopSNP1, zed); //x,y
      let pos6 = vec3(negativeTopSNP1, negativeTopSNP1, zed); //-x, -y
      let pos7 = vec3(positiveBottomSNP2, positiveBottomSNP2, zed); //x,y
      let pos8 = vec3(negativeBottomSNP2, negativeBottomSNP2, zed); //-x, -y
      /*****************STRAND****************/
      let strand = function (current) {
        rotateX(PI/2);
        let j = 0;
        for (j = 0; j < 1; j++) {
          let pairSpheres = function () {
            color(1.0, 1.0, 1.0);
            line(pos1, pos2, thickness * 2);
          line(pos3, pos4, thickness * 2);
          };
          let pairSNPs = function () {
            color(0.9-current, 0.5*current, 0.2);
            rotateZ(3);
            displace(0.0, 0.0, 0.0);
            line(pos5, pos6, thickness);
          //line(pos7, pos8, thickness);
          }
          pairSNPs();
          pairSpheres();
          displace(-0.30, 0.061, -0.0345); //space between SNPS
        }
      };
      displace(0.0, -0.8, 0.0); //position of entire strand
    }
/****************USE HOOKS TO LOAD SHADER ***********************/
const GenotypeColoring = ({ src }) => {
const shadeRef = useRef(null);
useEffect(() => {
if (shadeRef.current) {
  const canvas = document.querySelector(".my-canvas");

  sculptToMinimalRenderer(canvas, snpCode);
}
}, [src]);

return (
<div>
  <canvas className="my-canvas"></canvas>
  <iframe title="miframie" ref={shadeRef}>
<body className="removeAdditionaFrame"></body>
  </iframe>

</div>
);
};

axios.get('http://localhost:8080/gallery').then(res=>{
      console.log(res.data);
      let returnedJson = res.data;
      let makeOrganized = (jsnFile) => {
      let dnaX = jsnFile;
      console.log(dnaX);
      Object.values(dnaX).forEach((vul) => {
      let filledArray = new Array(1).fill(vul);
      let dataAll = filledArray[0];
      let dataG = dataAll.genotype;
      console.log(dataG);
      filledG(dataG);
      });
      }; 
      let convertJson = (jsnFile) => {
        let newObjectLiteral = {};  
        for (var item in jsnFile) {
        var newJsn = {} 
        newJsn.chromosome = jsnFile[item].chromosome;
        newJsn.genotype = jsnFile[item].genotype;
        newObjectLiteral[jsnFile[item].id] = newJsn;
        console.log(newObjectLiteral);
        makeOrganized(jsnFile);
        }
       
        };
        convertJson(returnedJson);
 
})




    };

      

  
    const Gallery = ({ src }) => {
        return (
        <>
        <div className="gallery">
            <div className="hero-container "></div>
            <div className="content"></div>
          <div className='gallery__inside '> 
          <div className="gallery__title "> ChromaGene Genotype Display:
            <img className="gallery__arrow" src={chevronImg} alt="img" />
          </div>
          <div className="gallery__subtitle "> Each color represents one of the 16 SNPs
          </div>
          <div className="gallery__subtitle "> Simulated Display: </div>
          <div className="gallery__about " >
          </div>
          </div>
        </div>
    <GenotypeColoring/>
      </>   
        );
    
}

export default Gallery;
