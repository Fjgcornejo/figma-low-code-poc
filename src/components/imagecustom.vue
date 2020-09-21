<template>
  <div>
      <img v-bind:style="{'max-height':'100px', 'margin-left': isDetail(element.name) ? '40px' : '0px'}" 
        :src="getSrc(value.vapers, element.props.databinding.default)"/>
  </div>
</template>

<script>
    export default {
      name: "imagecustom",
      props: ['value', 'element', 'model', 'config'],
      methods: {
        getSrc(vapers, databinding){

          console.log(databinding)
          try{
            let p = databinding.match(/\[(.*)\]/)[1]
            return vapers[p].image
          }catch(e){
             return this.value.selectedVaper.image;
          }

        },
        isDetail(name){
          return name === "ImageDetail"
        }
      }
    }
</script>

<style lang="css">
</style>
