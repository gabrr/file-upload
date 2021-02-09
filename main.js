const input = document.querySelector('input')
const container = document.querySelector('.file_holder')
const form = document.querySelector('#form')

container.onclick = () => input.click()
input.onchange = e => savingImage(input, e, container)
container.ondrop = (e) => savingImage(input, e, container)
container.ondragover = (e) => (e.preventDefault()) || e.target.classList.add('highlighted')
container.ondragleave = (e) => e.target.classList.remove('highlighted')
container.ondragend = (e) => e.target.classList.remove('highlighted')


/**
 * 
 * @param {HTMLElement} dropArea
 * @param {Event} e 
 */

const savingImage = (dropArea, e, imageHolder) => {
    const files = e.target.files || e.dataTransfer.files

    e?.preventDefault()
    sendFiles(form, files)
    
    if (files.length) {
        const isImageFiles = checkIsImageFiles(files)
        
        imageHolder.classList.replace('highlighted', 'done')

        if (isImageFiles) return (dropArea.files = files) && updateThumbnail(imageHolder, files[0])
    }

    imageHolder.style.backgroundImage = `none`
    imageHolder.innerHTML = 'Click or Drop an image here'
}

/**
 * Updates the thumbnails with the image file.
 * 
 * @param {HTMLElement} dropArea 
 * @param {File} file 
 */

const updateThumbnail = (dropArea, file) => {

    if (file.type.startsWith('image/')) {

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            dropArea.style.backgroundImage = `url("${reader.result}")`
            dropArea.innerHTML = ''
        }
    }
}

/**
 * Return boolean if the filelist has only images
 * @param {FileList} files
 */

const checkIsImageFiles = (files) => {
    let result = true
    for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) return alert('Only images are accepted!') || false
    }
    return result
}


// uploading files

/**
 * 
 * @param {HTMLFormElement} form 
 * @param {FileList} files 
 * @returns {Promise<HttpResponse>}
 */

const sendFiles = (form, files) => {
    form.onsubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('user', 'Gabriel Oliveira')
        data.append('images', files[0], 'image.png')

        fetch('http://localhost:5501/images', {
            method: 'post',
            body: data
        })
        .then((res) => console.log(res))
        .catch(err => console.error(err))
        
        console.log('data sent')
    }
}


