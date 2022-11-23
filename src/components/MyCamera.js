import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import {storage} from '../firebase/config'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

class MyCamera extends Component {
    constructor (props){
        super (props)
        this.state={
            permissions: false,
            showCamera: true,
            urlTemporal:''
        }
        this.metodosDeCamera= ''
        // esto se rellena cuando traiga el componente camara, cada vez que necesite usar un metodo de la camara voy a poner this.MetodosDeCamara
    }

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    //este metodo nos permite acceder a la camara. que apenas cargue le pida permisos al componente de expo.
    // si este permiso es aceptado queremos modificar el estado
    .then(() => this.setState(
        {
            permissions: true,
        }
    ))
    .catch (error=> console.log(error))
}

sacarFoto(){
    this.metodosDeCamera.takePictureAsync()
    .then( foto => {
        this.setState({
            urlTemporal: foto.uri,
            showCamera:false
        })
    })
    .catch(e => console.log(e))
}

guardarFoto(){
    fetch(this.state.urlTemporal) //busca la foto de la carpeta temporal en nuestra compu
    .then(res=> res.blob())
    //transforma eso que fue a buscar en el tipo de dato que necesitamos
    //las imagenes son un tipo de dato binario por eso ponemos res.blob
    .then(imagen => {
        const refStorage= storage.ref(`photos/${Date.now()}.jpg`);
        refStorage.put(imagen)
            .then(()=>{
                refStorage.getDownloadURL()
                .then(url => this.props.onImageUpload(url))
            })
            .then(()=>{
                this.setState({
                    showCamera:false
                })
            })
            //getdownloadURL es un metodo asincronico
            //put es un metodo asincronico, put guarda la foto en firebase (imagen es lo que recibo del segundo then)
        //ref es un metodo de storage, se va a crear una carpeta photos y ahi va a guardar el archivo
        //esto tiene una ruta con un nombre para poder guardarlo en firebase
        //storage permite guardar archivos en alguna parte de firebase

    })
    .catch(e=> console.log(e))
    //tenemos los datos para procesar
}

cancelar(){
        this.setState({
            urlTemporal: '',
        })
   
}

render(){
    return (
        // aca vamos a querer mostrar la camara
        <View  style = { styles.cameraBody}>
            {this.state.permissions ?
            this.state.showCamera ?
            <View  style = { styles.cameraBody} > 
                <Camera
                    style = { styles.cameraBody}
                    type= { Camera.Constants.Type.front}
                    ref={metodosDeCamera => this.metodosDeCamera = metodosDeCamera}
                    // la camara sabe sacar fotos, este componente sabe sacar una foto. (eso es un metodo= take picture)
                    //expo-camera tiene metodos adentro, no uso el take picture, por ende le digo a la camara que acabo de implementa
                    // buscame ese metodo que sepa sacar fotos y usalo
                    // que use su propia forma de sacar las fotos y la saque
                    // no vamos a escribir take picture
                    />
                <TouchableOpacity style={styles.button} onPress= {()=>this.sacarFoto()}>
                        <Text style={styles.sacar}>Sacar foto</Text>
                </TouchableOpacity>
            </ View>
            :
            <View  style={styles.preview}>
                <Image
                style={styles.preview}
                source={{uri: this.state.urlTemporal}}
                resizeMode='cover'
                />
                <TouchableOpacity style={styles.button} onPress={()=> this.cancelar()}>
                    <Text style={styles.boton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> this.guardarFoto()}>
                    <Text style={styles.boton}>Aceptar</Text>
                </TouchableOpacity>
            </View>
                :
            <Text> No tengo permisos</Text>
            }
        </View>
        // esto depende de si request camera permissionsAsync nos da permisos o no
    )
}
}
const styles= StyleSheet.create ({
    cameraBody: {
        height: '50vh',
        width: '100vw',
        position: 'absolute'
    },
    button:{
        height: '5vh',
        padding: 5,
        marginTop: 10,
        //flexbox para que este un boton al lado del otro
    },
    boton:{
        height: '5vh',
        padding: 5,
        marginTop: 20,
        backgroundColor: '#946F5B',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif;',
        fontSize:20,
        fontWeight: 'bold',
        color: 'white'
        //flexbox para que este un boton al lado del otro
    },
    preview:{
        height:'45vh'
    },

    sacar:{
        backgroundColor: '#946F5B',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif;',
        fontSize:20,
        fontWeight: 'bold',
        color: 'white'
    },



})
export default MyCamera;