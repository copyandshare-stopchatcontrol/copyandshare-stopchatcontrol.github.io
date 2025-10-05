 for folder  in   deutsch  english  espanol  francais  italiano  polski  portugues about  ; do sed -E  -i '/flag-about/! s|(class="nav-link[^"]*">[^<]* )([A-Za-z]{2})(</[aA]>)|\1\U\2\L\3|g'  $folder/index.html  ; done

 